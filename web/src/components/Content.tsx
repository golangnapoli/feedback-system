import React, { useState } from 'react';  
import FeedbackRow from './FeedbackRow';
import GithubLogin from './GithubLogin';
import WriteComment from './WriteComment';

function Content(): JSX.Element{

    const test : Array<string> = ['test', 'test', 'test', 'test'];

    return(
        <div className='top-0 flex-2 lg:flex-2 sm:flex-5 bg-trasparent flex lg:h-full h-[90%]'>
            
            <div className='flex flex-col'>

                <div className='flex-1 sm:flex-1 items-center justify-center w-full'>
                    <img src="./assets/logo.svg" alt="" className='lg:w-[250px] w-[200px] m-auto mt-10' />
                </div>

                <div className='flex flex-4 items-center justify-start mt-10 flex-col overflow-scroll'>
                    <WriteComment/>
                    <FeedbackRow/>
                    <FeedbackRow/>
                    <FeedbackRow/>
                    <FeedbackRow/>
                    <FeedbackRow/>
                </div>
            </div>


        </div>

    )

}

export default Content;