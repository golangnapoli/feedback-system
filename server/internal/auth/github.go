package auth

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"time"
)

type GithubClient struct {
	ClientID     string
	ClientSecret string
}

type GitHubOauthToken struct {
	Access_token string
}

type GitHubUserResult struct {
	Name  string
	Photo string
	Email string
}

func NewGithubClient() (*GithubClient, error) {
	clientID := os.Getenv("GNFS_GITHUB_CLIENT_ID")
	if clientID == "" {
		return &GithubClient{}, errors.New("client id not set")
	}

	clientSecret := os.Getenv("GNFS_GITHUB_CLIENT_SECRET")
	if clientSecret == "" {
		return &GithubClient{}, errors.New("client secret not set")
	}

	return &GithubClient{
		ClientID:     clientID,
		ClientSecret: clientSecret,
	}, nil
}

func (g *GithubClient) Auth(code string) (User, error) {
	token, err := g.GetGitHubOauthToken(code)
	if err != nil {
		return User{}, err
	}

	user, err := g.GetGitHubUser(token.Access_token)
	if err != nil {
		return User{}, err
	}

	return User{
		Name:  user.Name,
		Photo: user.Photo,
		Token: token.Access_token,
	}, nil

}

func (g *GithubClient) GetGitHubOauthToken(code string) (*GitHubOauthToken, error) {
	const rootURl = "https://github.com/login/oauth/access_token"

	values := url.Values{}
	values.Add("code", code)
	values.Add("client_id", g.ClientID)
	values.Add("client_secret", g.ClientSecret)

	query := values.Encode()

	queryString := fmt.Sprintf("%s?%s", rootURl, bytes.NewBufferString(query))
	req, err := http.NewRequest("POST", queryString, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	client := http.Client{
		Timeout: time.Second * 30,
	}

	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	if res.StatusCode != http.StatusOK {
		return nil, errors.New("could not retrieve token")
	}

	resBody, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	parsedQuery, err := url.ParseQuery(string(resBody))
	if err != nil {
		return nil, err
	}

	tokenBody := &GitHubOauthToken{
		Access_token: parsedQuery["access_token"][0],
	}

	return tokenBody, nil
}

func (g *GithubClient) GetGitHubUser(access_token string) (*GitHubUserResult, error) {
	rootUrl := "https://api.github.com/user"

	req, err := http.NewRequest("GET", rootUrl, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", access_token))

	client := http.Client{
		Timeout: time.Second * 30,
	}

	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	if res.StatusCode != http.StatusOK {
		return nil, errors.New("could not retrieve user")
	}

	resBody, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	var GitHubUserRes map[string]interface{}

	if err := json.Unmarshal(resBody, &GitHubUserRes); err != nil {
		return nil, err
	}

	userBody := &GitHubUserResult{
		Name:  GitHubUserRes["login"].(string),
		Photo: GitHubUserRes["avatar_url"].(string),
	}

	return userBody, nil
}
