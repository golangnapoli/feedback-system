import React from 'react';
import Title from './Title';

export interface LayoutProps {
  children: React.ReactNode;
  pageName: string;
}

function Layout(props: LayoutProps): JSX.Element {
  const { pageName, children } = props;

  return (
    <div
      className="flex lg:flex-row sm:flex-col flex-col h-screen bg-[url('https://i.imgur.com/64rUA4h.png')] bg-slate-800">
      <Title name={pageName}/>
      {children}
    </div>
  );
}

export default Layout;
