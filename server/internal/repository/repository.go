package repository

import "github.com/golangnapoli/feedback-system/internal/app"

type Repository interface {
	// Search returns the results of a search query.
	Find(query string) ([]app.Hint, error)
	// Index indexes a document.
	Save(doc app.Hint) error
}
