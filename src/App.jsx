import { useState } from 'react'
import './App.css'
import ImageScroller from './ImageScroller'
import SelectType from './SelectType'

function App() {
  const [type, setType] = useState("image"); // default = static image

  //Define the image URL path 
  function imageURL() {
    let base = "https://cataas.com/api/cats";

    if (type === "gif") {
      base += "?tags=gif";
    }

    return base;
  }

  return (
    <div className="generalContainer">
		<div className="title">CATS !!!!</div>

		<div className="toolbox">
			<SelectType onTypeChange={setType} />
		</div>

		<div className="ImageZone">
			<ImageScroller url={imageURL()}/>
		</div>
    </div>
  );
}

export default App;