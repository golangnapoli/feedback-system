export interface User {
  name: string;
  avatar: string;
  token: string;
}

export interface Hint {
  id?: number;
  title: string;
  body: string;
  author: Author;
  comments: number;
  type: "feedback" | "proposal";
  hint_url: string;
}

export type HintOut = Pick<Hint, "title" | "body" | "type" | "author">

interface Author {
  avatar_url?: string;
  name: string;
  profile_url?: string;
}
