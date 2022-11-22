package server

import (
	"fmt"
	"github.com/golangnapoli/feedback-system/internal/github"
	"github.com/golangnapoli/feedback-system/static"
	"io/fs"
	"net/http"
	"strings"

	"github.com/golangnapoli/feedback-system/api"
	"github.com/golangnapoli/feedback-system/internal/app"
	"github.com/golangnapoli/feedback-system/internal/auth"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.uber.org/zap"
)

type Server struct {
	config ServerConfig
	client *echo.Echo
}

type ServerConfig struct {
	Port    int
	Address string
}

func NewServer(config ServerConfig) *Server {
	return &Server{
		client: echo.New(),
		config: config,
	}
}

func (s *Server) Start() error {
	api.RegisterHandlers(s.client, s)

	logger, _ := zap.NewProduction()

	s.client.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogURI:    true,
		LogStatus: true,
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			logger.Info("request",
				zap.String("URI", v.URI),
				zap.Int("status", v.Status),
			)

			return nil
		},
	}))

	s.client.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{"*"},
	}))

	s.client.Use(ProcessTokenMiddleWare)

	fsys, err := fs.Sub(static.WebClient, "web-client")
	if err != nil {
		return err
	}

	s.client.Group("/*", middleware.StaticWithConfig(middleware.StaticConfig{
		Root:       ".",
		Filesystem: http.FS(fsys),
		HTML5:      true,
	}))

	return s.client.Start(fmt.Sprintf("%s:%d", s.config.Address, s.config.Port))
}

func ProcessTokenMiddleWare(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		token := c.Request().Header.Get("Authorization")

		tks := strings.Split(token, "Bearer ")

		if len(tks) == 2 {
			token = tks[1]
		}

		c.Set("token", token)

		return next(c)
	}
}

// Get all hints
// (GET /v1/hint)
func (s *Server) GetAllHints(ctx echo.Context, params api.GetAllHintsParams) error {
	token, ok := ctx.Get("token").(string)
	if !ok {
		return ctx.JSON(http.StatusBadRequest, "invalid token")
	}

	client := github.NewWithAuth(token)

	hints, err := client.Find()

	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
	}

	return ctx.JSON(http.StatusOK, hints)
}

// Create a new hint
// (POST /v1/hint)
func (s *Server) CreateHint(ctx echo.Context) error {
	// Get the hint from the request
	hint := app.Hint{}
	if err := ctx.Bind(&hint); err != nil {
		return err
	}

	token, ok := ctx.Get("token").(string)
	if !ok {
		return ctx.JSON(http.StatusBadRequest, "invalid token")
	}

	client := github.NewWithAuth(token)

	// Save the hint
	if err := client.Save(hint); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	return ctx.JSON(http.StatusCreated, hint)
}

// Get a hint by id
// (GET /v1/hint/{id})
func (s *Server) GetHintById(ctx echo.Context, id int) error {
	token, ok := ctx.Get("token").(string)
	if !ok {
		return ctx.JSON(http.StatusBadRequest, "invalid token")
	}

	client := github.NewWithAuth(token)

	hint, err := client.FindByID(id)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
	}

	return ctx.JSON(http.StatusOK, hint)
}

// Update a hint by id
// (PUT /v1/hint/{id})
func (s *Server) UpdateHintById(ctx echo.Context, id string) error {

	return nil
}

// Login with a provider
// (POST /v1/login/auth/{provider})
func (s *Server) LoginWithProvider(ctx echo.Context, provider api.LoginWithProviderParamsProvider) error {
	l := api.LoginRequest{}
	if err := ctx.Bind(&l); err != nil {
		ctx.JSON(http.StatusBadRequest, err)
	}

	au, err := auth.Factory(string(provider))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
	}

	user, err := au.Auth(l.Code)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
	}

	u := api.User{
		Avatar: user.Photo,
		Name:   user.Name,
		Token:  user.Token,
	}

	return ctx.JSON(http.StatusOK, u)
}
