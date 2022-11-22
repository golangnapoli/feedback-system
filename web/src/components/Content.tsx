import React, {useContext, useEffect, useState} from 'react';
import FeedbackRow from './FeedbackRow';
import {AuthContext} from "../App";
import {Hint} from "../types";
import {AddFeedbackModal} from "./AddFeedbackModal";

function Content(): JSX.Element {
  const {state} = useContext(AuthContext);
  const [hints, setHints] = useState<Hint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  const fetchHints = () => {
    const token = "token" in state.user ? state.user.token : "";

    fetch(`${state.server_url}/v1/hint`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setHints(data)
      })
      .catch(error => {
        setError("Sorry! Something went wrong, try refreshing the page.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchHints()
  }, []);

  return (
    <>
      {modalOpen && <AddFeedbackModal close={() => {
        setModalOpen(false)
        fetchHints()
      }}/>}
      <div className='top-0 flex-2 pr-4 lg:flex-2 sm:flex-5 bg-trasparent justify-center w-full flex lg:h-full h-[90%]'>
        <div className='flex flex-col w-full max-w-screen-lg justify-start items-center'>
          <div className='flex-0 sm:flex-0 items-center justify-center w-full'>
            <img src="./assets/logo.svg" alt="" className='w-[300px] m-auto mt-10'/>
          </div>
          <div className="flex w-full justify-end">
            {state.isLoggedIn ? <button
                className="pointer-events-auto cursor-pointer ml-8 rounded-md bg-cyan-500 w-40 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-cyan-400"
                onClick={() => {
                    setModalOpen(true)
                  }
                }
              >
                Add new feedback
              </button> :
              <a href={`/login`} className="pointer-events-auto ml-8 rounded-md bg-cyan-500 w-52 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-cyan-400">
                Login to contribute!
              </a>
            }
          </div>
          {state.isLoggedIn &&
            <div className='flex flex-4 items-center justify-start mt-10 flex-col overflow-scroll'>
              {isLoading ? (
                <div className='flex flex-1 items-center justify-center'>
                  <img src="./assets/loading.svg" alt="" className='w-[100px]'/>
                </div>
              ) : (
                error != "" ? (
                  <div className='text-white text-2xl'>{error}</div>
                ) :
                (hints && hints.length > 0) ? hints.map((hint: Hint) => (
                  <FeedbackRow key={hint.id} hint={hint}/>
                )) : <div className='text-white text-2xl'>No hints yet</div>
              )}
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Content;
