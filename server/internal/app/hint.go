package app

type Hint struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Body      string    `json:"body"`
	Type      string    `json:"type"`
	CreatedAt string    `json:"created_at"`
	Reactions int       `json:"reactions"`
	Comments  []Comment `json:"comments"`
	Author    Author    `json:"author"`
	URL       string    `json:"hint_url"`
}

type Comment struct {
	Body   string `json:"body"`
	Author Author `json:"author"`
}

type Author struct {
	Name       string `json:"name"`
	AvatarURL  string `json:"avatar_url"`
	ProfileURL string `json:"profile_url"`
}
