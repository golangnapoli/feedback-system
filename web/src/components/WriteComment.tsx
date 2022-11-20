import React, { useState } from 'react';  
import { IoPush } from 'react-icons/io5';

function WriteComment(): JSX.Element{


    return(


        <div className='w-2/3'>
            <p className='text-center font-regular text-yellow-50 text-lg'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, deserunt!
            </p>

            <div className='flex flex-1 lg:flex-row flex-col min-h-max m-10 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg'>

                <div className='flex flex-col flex-1 lg:items-start items-center lg:justify-start justify-center '>
                    <img src="https://picsum.photos/100/100" alt="" className='rounded-[100%] lg:m-5 -mt-5 w-[80px] shadow-lg' />
                    <h1 className='w-font-medium text-sm text-yellow-50 text-center ml-5 '>Lorem Ipsum</h1>
                </div>

                <div className=' flex flex-col flex-5 justify-end'>
                    
                    <div className='flex-5 lg:flex-4 lg:pr-10 p-5'>
                        
                        <input placeholder="Title" type="text" className='font-light w-full rounded p-2 text-xl mb-2 text-yellow-50 lg:text-left bg-transparent shadow-xl'/>
                        <textarea placeholder="Text here" className='font-light resize-none w-full rounded mt-3 p-2 text-xl mb-2 h-[150px] text-yellow-50 lg:text-left bg-transparent shadow-xl'></textarea>
                        
                    </div>

                    <div className='flex-1 flex justify-end'>
                        <a href="#" className=' lg:mr-10 w-fit flex space-x-3 p-3 items-center mb-5 
                        rounded drop-shadow-lg bg-green-800 bg-opacity-40 backdrop-blur-md hover:bg-green-500 hover:bg-opacity-50
                      hover:text-yellow-50 transition-all duration-500 text-sm'>

                        <IoPush size={20} color={"#252525"}/>
                        <p>Submit</p>
                    </a> 
                    </div>
                    
                </div>
                
                 

                  
            </div>

        </div>

    )

}

export default WriteComment;