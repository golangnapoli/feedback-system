import React from 'react';

export interface TitleProps {
  name: string;
}

function Title(props: TitleProps): JSX.Element {
  const { name } = props;

  return (
    <div className='top-0 h-full left-0 absolute flex-0 hidden lg:block bg-trasparent'>
      <div className='flex justify-start items-center h-full'>
        <h1 className='text-yellow-50 text-xl xl:text-7xl lg:text-6xl md:text-2xl font-bold text-center -rotate-90'>{name}</h1>
      </div>
    </div>
  )
}

export default Title;
