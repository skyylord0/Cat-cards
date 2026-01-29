import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageScroller from './ImageScroller'

function App() {

  return (
	<div className="generalContainer">
		<div className="title">CATS !!!!</div>
		<div className="toolbox">
			<></>
		</div>
		<div className="ImageZone">
			<ImageScroller url="https://cataas.com/api/cats"/>
		</div>
	</div>
  );
}


export default App
