import React, {useContext, useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthContext} from "../App";
import {User} from "../types";

function GithubLogin(): JSX.Element {
  const {state, dispatch} = useContext(AuthContext);
  const [data, setData] = useState({errorMessage: "", isLoading: false});

  const {client_id, redirect_uri} = state;
  const proxy_url = `${state.server_url}/v1/login/auth/github`;

  console.log(proxy_url);

  useEffect(() => {
    // After requesting GitHub access, GitHub redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If GitHub API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, "", newUrl[0]);
      setData({...data, isLoading: true});

      const requestData = {
        code: newUrl[1]
      };

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(proxy_url!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      })
        .then(response =>
          response.json()
        )
        .then((u: User) => {
          dispatch({
            type: "LOGIN",
            payload: {user: u, isLoggedIn: true}
          });
        })
        .catch(error => {
          setData({
            isLoading: false,
            errorMessage: "Sorry! Login failed"
          });
        });
    }
  }, [state, dispatch, data]);

  if (state.isLoggedIn) {
    console.log(state)
    return <Navigate to="/"/>;
  }

  return (
    <section className="container">
      <div>
        <h1>Welcome</h1>
        <span>Super amazing app</span>
        <span>{data.errorMessage}</span>
        <div className="login-container">
          {data.isLoading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              {
                // Link to request GitHub access
              }
              <a
                className="login-link"
                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                onClick={() => {
                  setData({...data, errorMessage: ""});
                }}
              >
                {/* <GithubIcon /> */}
                <span>Login with GitHub</span>
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default GithubLogin;
