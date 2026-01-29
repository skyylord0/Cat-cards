import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search_bar from './SearchBar'

function App() {

  return (
	<>
		<div className="title">CATS !!!!</div>
		<div className="toolbox">
      <Search_bar />

			<></>
		</div>
		<div className="">
			<div className="card">
			  <img src="https://cataas.com/cat" className="catImage"></img>
			</div>
		</div>
	</>
  );
}



export default App
