import React from 'react';
import {BiComment} from 'react-icons/bi'
import {SiGithub} from 'react-icons/si'
import {GiBreadSlice} from 'react-icons/gi'
import {Hint} from "../types";

export interface FeedbackProps {
  hint: Hint;
}

function FeedbackRow(props: FeedbackProps): JSX.Element {
  const {hint} = props;

  return (
    <div
      className='flex flex-1 lg:flex-row flex-col min-h-max m-10 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg w-2/3'>

      <div className='flex flex-1 items-center justify-center lg:items-start'>
        <img src={hint.author.avatar_url} alt="" className='rounded-[100%] lg:m-5 -mt-5 w-[80px]'/>
      </div>

      <div className='flex-5 lg:flex-4 lg:pr-10 p-5'>
        <p className='font-bold text-xl mb-2 text-cyan-500 lg:text-left text-center'>{hint.title}</p>
        <p className='mb-3 text-yellow-50 lg:text-left text-center'>
          {hint.body}
        </p>

        <div className='flex space-x-10 justify-end'>
          <button className='mt-3 flex items-center'><span
            className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{hint.type}</span></button>
          <button className='mt-3 flex items-center'>{hint.comments}<BiComment/></button>
          <a href={hint.hint_url} className='mt-3 flex items-center' target="_blank"><SiGithub/></a>
        </div>
      </div>
    </div>
  )
}

export default FeedbackRow;