import {User} from "../types";

export interface State {
  user: User | {};
  isLoggedIn: boolean;
  client_id?: string;
  redirect_uri?: string;
  server_url?: string;
}

export const initialState: State = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")!) || false,
  user: JSON.parse(localStorage.getItem("user")!) || {},
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  server_url: process.env.REACT_APP_SERVER_URL
};

export const reducer = (state: State, action: { type: any; payload: { isLoggedIn: any; user: User; }; }): State => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn))
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user
      } as State;
    }
    case "LOGOUT": {
      localStorage.clear()
      return {
        ...state,
        isLoggedIn: false,
        user: {}
      } as State;
    }
    default:
      return state;
  }
};