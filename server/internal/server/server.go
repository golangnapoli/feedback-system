package server

import (
	"fmt"
	"net/http"

	"github.com/golangnapoli/feedback-system/api"
	"github.com/golangnapoli/feedback-system/internal/app"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.uber.org/zap"
)

type Server struct {
	config ServerConfig
	repo   app.HintRepository
	client *echo.Echo
}

type ServerConfig struct {
	Port    int
	Address string
}

func NewServer(config ServerConfig, repo app.HintRepository) *Server {
	return &Server{
		client: echo.New(),
		config: config,
		repo:   repo,
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

	return s.client.Start(fmt.Sprintf("%s:%d", s.config.Address, s.config.Port))
}

// Get all hints
// (GET /v1/hint)
func (s *Server) GetAllHints(ctx echo.Context, params api.GetAllHintsParams) error {
	hints, err := s.repo.Find()

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

	// Save the hint
	if err := s.repo.Save(hint); err != nil {
		return ctx.JSON(http.StatusBadRequest, err)
	}

	return ctx.JSON(http.StatusCreated, hint)
}

// Get a hint by id
// (GET /v1/hint/{id})
func (s *Server) GetHintById(ctx echo.Context, id int) error {
	hint, err := s.repo.FindByID(id)

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
	if provider == "github" {
		
	}

	return nil
}
