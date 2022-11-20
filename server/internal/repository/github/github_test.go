package github_test

import (
	"context"
	"os"
	"testing"

	"github.com/golangnapoli/feedback-system/internal/app"
	githubx "github.com/golangnapoli/feedback-system/internal/repository/github"
	"github.com/stretchr/testify/assert"

	"golang.org/x/oauth2"
)

// in order to test the methods that modify data, a real OAuth token will need to be present.
// While the tests will try to be well-behaved in terms of what data they modify, it is strongly recommended that these tests only be run using a dedicated test account.

func TestFind(t *testing.T) {
	token := os.Getenv("GITHUB_TOKEN")
	if token == "" {
		t.Fatal("GITHUB_TOKEN is not set")
	}

	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: token},
	)
	tc := oauth2.NewClient(ctx, ts)
	client := githubx.New(tc)

	hints, err := client.Find()

	assert.NoError(t, err)
	assert.NotNil(t, hints)
}

func TestFindByID(t *testing.T) {
	token := os.Getenv("GITHUB_TOKEN")
	if token == "" {
		t.Fatal("GITHUB_TOKEN is not set")
	}

	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: token},
	)
	tc := oauth2.NewClient(ctx, ts)
	client := githubx.New(tc)

	hint, err := client.FindByID(1)

	assert.NoError(t, err)
	assert.NotEmpty(t, hint)
}

func TestSave(t *testing.T) {
	token := os.Getenv("GITHUB_TOKEN")
	if token == "" {
		t.Fatal("GITHUB_TOKEN is not set")
	}

	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: token},
	)
	tc := oauth2.NewClient(ctx, ts)
	client := githubx.New(tc)

	hint := app.Hint{
		Title:  "Test",
		Body:   "Test",
		Type:   "bug",
		Author: app.Author{Name: "luigibarbato", AvatarURL: "https://avatars.githubusercontent.com/u/10111?v=4"},
		URL:    "",
	}

	err := client.Save(hint)

	assert.NoError(t, err)
}
