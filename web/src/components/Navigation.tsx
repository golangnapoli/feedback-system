import React from 'react';

function Navigation(): JSX.Element {

    return(
        <div className='flex justify-center items-center flex-1 bg-trasparent text-center '>

            <ul className='text-yellow-50 font-thin text-xl
                flex flex-row w-full bg-black lg:bg-opacity-0 bg-opacity-30 rounded-xl h-full lg:backdrop-blur-none backdrop-blur-md
                justify-center
            '>
                <li className='flex flex-1 lg:items-start lg:mt-20 mt-0 justify-center items-center'><a href="#">Incontri</a></li>
                <li className='flex flex-1 lg:items-start lg:mt-20 mt-0 justify-center items-center'><a href="#">Feedbacks</a></li>
                <li className='flex flex-1 lg:items-start lg:mt-20 mt-0 justify-center items-center'><a href="#">About</a></li>
            </ul>
                
        </div>

    )

}

export default Navigation;