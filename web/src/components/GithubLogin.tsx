import React, {useContext, useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthContext} from "../App";
import {User} from "../types";
import Layout from "./Layout";
import {SiGithub} from "react-icons/si";

function GithubLogin(): JSX.Element {
  const {state, dispatch} = useContext(AuthContext);
  const [data, setData] = useState({errorMessage: "", isLoading: false});

  const {client_id, redirect_uri} = state;
  const proxy_url = `${state.server_url}/v1/login/auth/github`;

  console.log(proxy_url);

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, "", newUrl[0]);
      setData({...data, isLoading: true});

      const requestData = {
        code: newUrl[1]
      };

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
            errorMessage: "Sorry! Login failed, try again."
          });
        });
    }
  }, [state, dispatch, data]);

  if (state.isLoggedIn) {
    return <Navigate to="/"/>;
  }

  return (
    <Layout pageName="Login">
      <div className='top-0 flex-2 pr-4 lg:flex-2 sm:flex-5 bg-trasparent justify-center w-full flex lg:h-full h-[90%]'>
        <div className='flex flex-col w-full max-w-screen-lg justify-center'>
          <div className='flex-1 sm:flex-1 items-center justify-center w-full'>
            <img src="./assets/logo.svg" alt="" className='w-[300px] m-auto mt-10'/>
          </div>
          <div className='flex flex-4 items-center justify-start mt-10 flex-col overflow-scroll'>
            <div className="flex flex-col w-52 rounded overflow-hidden shadow-lg bg-amber-50 p-4">
              {data.isLoading ? (
                <div className='flex flex-1 items-center justify-center'>
                  <img src="./assets/loading.svg" alt="" className='w-[100px]'/>
                </div>
              ) : (
                <a
                  className="flex flex-col justify-center items-center w-full h-full"
                  href={`https://github.com/login/oauth/authorize?scope=user%20public_repo&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                  onClick={() => {
                    setData({...data, errorMessage: ""});
                  }}
                >
                  <SiGithub size="100px"/>
                  <span>Login with GitHub</span>
                </a>
              )}
              <span className="mt-3.5 text-red-800">{data.errorMessage}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default GithubLogin;
