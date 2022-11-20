import React from 'react';

function Navigation(): JSX.Element {

    return(
        <div className='top-0 flex-1 bg-trasparent'>

            <ul className='text-yellow-50 font-medium flex flex-row w-full mt-10'>
                <li className='flex-1 text-center'><a href="#"></a>Incontri</li>
                <li className='flex-1 text-center'><a href="#"></a>Feedbacks</li>
                <li className='flex-1 text-center'><a href="#"></a>About</li>
            </ul>
                
        </div>

    )

}

export default Navigation;