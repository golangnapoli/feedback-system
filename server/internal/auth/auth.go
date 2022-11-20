package auth

import (
	"errors"
)

type Authenticator interface {
	Auth(code string) (User, error)
}

type User struct {
	Email string
	Name  string
	Photo string
	Token string
}

func Factory(provider string) (Authenticator, error) {
	switch provider {
	case "github":
		githubClient, err := NewGithubClient()
		if err != nil {
			return nil, err
		}

		return githubClient, nil
	default:
		return nil, errors.New("provider not supported")
	}
}
