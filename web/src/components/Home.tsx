import React from 'react';
import Title from './Title';
import Content from './Content';
import Navigation from './Navigation';

function Home(): JSX.Element {
  return (
    <div
      className="flex lg:flex-row sm:flex-col flex-col h-screen bg-[url('https://i.imgur.com/64rUA4h.png')] bg-slate-800">
      <Title/>
      <Content/>
      <Navigation/>
    </div>
  );
}

export default Home;