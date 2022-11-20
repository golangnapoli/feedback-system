import React from 'react';
import Titolo from './components/Titolo';
import Content from './components/Content';
import Navigation from './components/Navigation';

function App(): JSX.Element {
	return (
		<div className="flex lg:flex-row sm:flex-col flex-col h-screen bg-[url('https://i.imgur.com/64rUA4h.png')] bg-slate-800">
			<Titolo/>
			<Content/>
			<Navigation/>
		</div>
	);
}

export default App;
