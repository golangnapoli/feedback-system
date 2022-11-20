import React from 'react';
import Titolo from './components/Titolo';
import Content from './components/Content';
import Navigation from './components/Navigation';

function App(): JSX.Element {
	return (
		<div className="flex lg:flex-row sm:flex-col flex-col h-screen bg-[url('https://picsum.photos/id/44/1920/1080')]">
			<Titolo/>
			<Content/>
			<Navigation/>
		</div>
	);
}

export default App;
