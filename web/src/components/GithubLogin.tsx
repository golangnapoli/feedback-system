import React from 'react';
import { SiGithub } from 'react-icons/si'

function GithubLogin(): JSX.Element {

    return(
        <div className='flex flex-col w-2/4 h-[200px] bg-trasparent mb-10 items-center'>

            <p className='flex-1 text-center font-regular text-yellow-50 text-lg'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, deserunt id necessitatibus numquam praesentium impedit illo corrupti quas eligendi accusantium!
            </p>
            
            <a href="#" className='flex content-between space-x-3 p-3 w-fit items-center mt-5 
                rounded drop-shadow-lg bg-white bg-opacity-40 backdrop-blur-md hover:bg-cyan-500 hover:bg-opacity-20
              hover:text-yellow-50 transition-all duration-500'>

                <SiGithub size={35} color={"#5653ED"}/>
                <p>Sign in with GitHub</p>
            </a>
            
        </div>

    )

}

export default GithubLogin;