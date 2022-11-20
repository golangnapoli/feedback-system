import React, {useContext, useEffect, useState} from 'react';
import FeedbackRow from './FeedbackRow';
import {AuthContext} from "../App";
import {Hint} from "../types";

function Content(): JSX.Element {
  const {state, dispatch} = useContext(AuthContext);

  const [hints, setHints] = useState<Hint[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if ("token" in state.user) {
      fetch(`${state.server_url}/v1/hint`, {
        headers: {
          "Authorization": `Bearer ${state.user.token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setHints(data)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, []);


  return (
    <div className='top-0 flex-2 lg:flex-2 sm:flex-5 bg-trasparent flex lg:h-full h-[90%]'>

      <div className='flex flex-col'>

        <div className='flex-1 sm:flex-1 items-center justify-center w-full'>
          <img src="./assets/logo.svg" alt="" className='w-[300px] m-auto mt-10'/>

          {state.isLoggedIn ? <div className="pointer-events-auto ml-8 rounded-md bg-indigo-600 w-40 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">
              Post new feedback
            </div> :
            <a href={`/login`} className="pointer-events-auto ml-8 rounded-md bg-indigo-600 w-52 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">
              Login to contribute
            </a>
          }
        </div>

        {state.isLoggedIn ?
          <div className='flex flex-4 items-center justify-start mt-10 flex-col overflow-scroll'>
            {isLoading ? (
              <div className='flex flex-1 items-center justify-center'>
                <img src="./assets/loading.svg" alt="" className='w-[100px]'/>
              </div>
            ) : (
              (hints && hints.length > 0) ? hints.map((hint: Hint) => (
                <FeedbackRow key={hint.id} hint={hint}/>
              )) : <div className='text-white text-2xl'>No hints yet</div>
            )}
          </div> :
          <></>
        }
      </div>


    </div>

  )

}

export default Content;