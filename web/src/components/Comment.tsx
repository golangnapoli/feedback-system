import React from 'react';

function FeedbackRow(): JSX.Element {


  return (
    <div
      className='flex flex-1 lg:flex-row flex-col min-h-max m-10 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg w-2/3'>

      <div className='flex flex-1 items-center justify-center lg:items-start'>
        <img src="https://picsum.photos/100/100" alt="" className='rounded-[100%] lg:m-5 -mt-5 w-[80px]'/>
      </div>

      <div className='flex-5 lg:flex-4 lg:pr-10 p-5'>
        <p className='font-bold text-xl mb-2 text-cyan-500 lg:text-left text-center'>Lorem Ipsum</p>
        <p className='mb-3 text-yellow-50 lg:text-left text-center'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At ab sit laborum architecto excepturi quas expedita
          repudiandae. Possimus, perspiciatis cumque?
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis eaque natus nobis recusandae id magnam vero
          ipsum debitis, molestias hic! Libero, sed veritatis esse reiciendis quibusdam explicabo mollitia
          exercitationem aliquam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, aliquam!
        </p>
      </div>
    </div>

  )

}

export default FeedbackRow;