import { useState } from 'react'
import './App.css'
import SelectType from './SelectType'
import AddText from './AddText';

function App() {
  const [type, setType] = useState("image"); // default = static image
  const [text, setText] = useState("");       // validated caption
  const [inputText, setInputText] = useState(""); // live typing

  //Define the image URL path 
  function imageURL() {
    let base = "https://cataas.com/cat";

    //If GIF type is selected
    if (type === "gif") {
      base += "/gif";
    }

    // Add code to put tags

    //If text is added
    //// A condition vrifiying if text is empty
    if (text !== "") {
      const encodedText = encodeURIComponent(text)
      base += "/says/" + encodedText;
    }

    console.log(base)
    return base;
  }

  return (
    <>
      <div className="title">CATS !!!!</div>

      <div className="toolbox">
        <SelectType onTypeChange={setType} />
        <AddText
          inputText={inputText}
          onInputChange={setInputText}
          onValidate={() => setText(inputText)}
        />
      </div>

      <div className="card">
        <img src={imageURL()} className="catImage" />
      </div>
    </>
  );
}

export default App;