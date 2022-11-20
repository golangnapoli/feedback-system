import React from 'react';

function Titolo(): JSX.Element{

    return(
        <div className='top-0 flex-1 hidden lg:block bg-trasparent'>
            
            <div className='flex justify-center items-center h-full'>
                <h1 className='text-yellow-50 text-9xl font-bold text-center -rotate-90 '>Titolo</h1>
            </div>
        </div>

    )

}

export default Titolo;