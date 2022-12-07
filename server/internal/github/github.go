package github

import (
	"context"
	"net/http"

	"golang.org/x/oauth2"

	"github.com/golangnapoli/feedback-system/internal/app"
	"github.com/golangnapoli/feedback-system/internal/util/slicex"
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

	f := []string{"feedback", "proposal"}

	// We use this custom filter function because the github library doesn't support filtering by diffent labels in a one call.
	filtered := slicex.Filter(result, func(v *github.Issue) bool {
		for _, label := range v.Labels {
			for _, t := range f {
				if label.GetName() == t {
					return true
				}
			}
		}

		return false
	})

	hints := make([]app.Hint, len(filtered))

	for i, r := range filtered {
		comments := 0

		if r.Comments != nil {
			comments = *r.Comments
		}

		hints[i] = app.Hint{
			ID:        r.GetNumber(),
			Title:     r.GetTitle(),
			Body:      r.GetBody(),
			Type:      r.Labels[0].GetName(),
			CreatedAt: r.GetCreatedAt().String(),
			Comments:  comments,
			Author: app.Author{
				Name:       r.GetUser().GetName(),
				AvatarURL:  r.GetUser().GetAvatarURL(),
				ProfileURL: r.GetUser().GetHTMLURL(),
			},
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
