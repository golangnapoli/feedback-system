import React, { useState } from 'react';
import { BiComment } from 'react-icons/bi'  
import { SiGithub } from 'react-icons/si'
import { GiBreadSlice } from 'react-icons/gi' 

function FeedbackRow(): JSX.Element{


    return(
        <div className='flex flex-1 lg:flex-row flex-col min-h-max m-10 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg w-2/3'>
            
            <div className='flex flex-col flex-1 lg:items-start items-center lg:justify-start justify-center '>
                <img src="https://picsum.photos/100/100" alt="" className='rounded-[100%] lg:m-5 -mt-5 w-[80px] shadow-lg' />
                <h1 className='w-font-medium text-sm text-yellow-50 text-center ml-5 '>Lorem Ipsum</h1>
            </div>

            <div className='flex-5 lg:flex-4 lg:pr-10 p-5'>
                <p className='font-bold text-xl mb-2 text-cyan-500 lg:text-left text-center'>Lorem Ipsum</p>
                <p className='mb-3 text-yellow-50 lg:text-left text-center'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At ab sit laborum architecto excepturi quas expedita repudiandae. Possimus, perspiciatis cumque?
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis eaque natus nobis recusandae id magnam vero ipsum debitis, molestias hic! Libero, sed veritatis esse reiciendis quibusdam explicabo mollitia exercitationem aliquam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, aliquam!
                </p>

                <div className='flex lg:justify-end justify-center'>
                    <div className='space-x-10 shadow-lg p-2'>
                        <button className='mt-3'><GiBreadSlice size={25} color={"#FEE8FC"}/></button>
                        <button className='mt-3'><BiComment size={25} color={"#06B6D4"}/></button>
                        <button className='mt-3'><SiGithub size={25} color={"#5653ED"}/></button>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default FeedbackRow;