package github

import (
	"context"
	"golang.org/x/oauth2"
	"net/http"

	"github.com/golangnapoli/feedback-system/internal/app"
	"github.com/google/go-github/v39/github"
)

type Github struct {
	client *github.Client
}

func NewWithAuth(token string) *Github {
	aCtx := context.Background()

	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: token},
	)
	tc := oauth2.NewClient(aCtx, ts)

	return New(tc)
}

func New(h *http.Client) *Github {
	c := github.NewClient(h)

	return &Github{
		client: c,
	}
}

// Find returns a list of hints.
func (g *Github) Find() ([]app.Hint, error) {
	result, _, err := g.client.Issues.ListByRepo(context.Background(), "golangnapoli", "feedbacks-and-proposals", nil)
	if err != nil {
		return nil, err
	}

	hints := make([]app.Hint, len(result))
	for i, r := range result {
		hints[i] = app.Hint{
			ID:        r.GetNumber(),
			Title:     r.GetTitle(),
			Body:      r.GetBody(),
			Type:      r.Labels[0].GetName(),
			CreatedAt: r.GetCreatedAt().String(),
			Author: app.Author{
				Name:      r.GetUser().GetName(),
				AvatarURL: r.GetUser().GetAvatarURL(),
			},
			URL: r.GetHTMLURL(),
		}
	}

	return hints, nil
}

// FindByID returns a hint by its ID.
func (g *Github) FindByID(id int) (app.Hint, error) {
	result, _, err := g.client.Issues.Get(context.Background(), "golangnapoli", "feedbacks-and-proposals", id)
	if err != nil {
		return app.Hint{}, err
	}

	hint := app.Hint{
		ID:        result.GetNumber(),
		Title:     result.GetTitle(),
		Body:      result.GetBody(),
		Type:      result.Labels[0].GetName(),
		CreatedAt: result.GetCreatedAt().String(),
		Author: app.Author{
			Name:      result.GetUser().GetName(),
			AvatarURL: result.GetUser().GetAvatarURL(),
		},
		URL: result.GetHTMLURL(),
	}

	return hint, nil
}

// Save saves a hint.
func (g *Github) Save(h app.Hint) error {
	_, _, err := g.client.Issues.Create(context.Background(), "golangnapoli", "feedbacks-and-proposals", &github.IssueRequest{
		Title:    &h.Title,
		Body:     &h.Body,
		Labels:   &[]string{h.Type},
		Assignee: &h.Author.Name,
	})
	if err != nil {
		return err
	}

	return nil
}
