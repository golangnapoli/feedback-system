package app

type HintRepository interface {
	// Find returns a list of hints.
	Find() ([]Hint, error)
	// FindByID returns a hint by its ID.
	FindByID(id int) (Hint, error)
	// Save saves a hint.
	Save(h Hint) error
}

type Hint struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Body      string `json:"body"`
	Type      string `json:"type"`
	CreatedAt string `json:"created_at"`
	Reactions int    `json:"reactions"`
	Comments  int    `json:"comments"`
	Author    Author `json:"author"`
	URL       string `json:"hint_url"`
}

type Author struct {
	Name       string `json:"name"`
	AvatarURL  string `json:"avatar_url"`
	ProfileURL string `json:"profile_url"`
}
