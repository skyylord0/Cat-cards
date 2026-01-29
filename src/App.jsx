import { useState } from 'react'
import './App.css'
import SelectType from './SelectType'

function App() {
  const [type, setType] = useState("image"); // default = static image

  //Define the image URL path 
  function imageURL() {
    let base = "https://cataas.com/cat";

    if (type === "gif") {
      base += "/gif";
    }

    return base;
  }

  return (
    <>
      <div className="title">CATS !!!!</div>

      <div className="toolbox">
        <SelectType onTypeChange={setType} />
      </div>

      <div className="card">
        <img src={imageURL()} className="catImage" />
      </div>
    </>
  );
}

export default App;