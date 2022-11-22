import React, {createContext, Dispatch, useReducer} from "react";
import {initialState, reducer, State} from "./store";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import GithubLogin from './components/GithubLogin';
import Home from './components/Home';

export const AuthContext = createContext<{
  state: State;
  dispatch: Dispatch<any>;
}>({state: initialState, dispatch: () => null});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<GithubLogin/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

