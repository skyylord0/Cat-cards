import { useState } from 'react'
import './App.css'
import SelectType from './SelectType'
import AddText from './AddText';

function App() {
  const [type, setType] = useState("image"); // default = static image
  const [text, setText] = useState("");       // validated caption
  const [inputText, setInputText] = useState(""); // live typing
  const [catId, setCatId] = useState(null);   // pinned cat ID
  const [loading, setLoading] = useState(false);

  // Fetch a new random cat and store its ID
  async function handleNewCat() {
    setLoading(true);
    setText("");
    setInputText("");

    const endpoint = type === "gif"
      ? "https://cataas.com/cat/gif?json=true"
      : "https://cataas.com/cat?json=true";

    try {
      const res = await fetch(endpoint);
      const jsonData = await res.json();
      setCatId(jsonData.id);
    } catch (err) {
      console.error("Failed to fetch cat:", err);
    } finally {
      setLoading(false);
    }
  }

  // Apply caption to the current cat (no new fetch = same cat)
  function handleAddCaption() {
    setText(inputText);
  }

  // Define the image URL path
  function imageURL() {
    if (!catId) return null;

    let base = "https://cataas.com/cat";

    // Add the cat ID to pin the specific cat
    base += "/" + catId;

    // Add code to put tags

    // If text is added
    if (text !== "") {
      const encodedText = encodeURIComponent(text);
      base += "/says/" + encodedText;
    }

    console.log(base);
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
          onValidate={handleAddCaption}
        />
        <button onClick={handleNewCat} disabled={loading}>
          {loading ? "Loading..." : "🐱 New Cat"}
        </button>
        <button onClick={handleAddCaption} disabled={!catId}>
          💬 Add Caption
        </button>
      </div>

      <div className="card">
        {catId
          ? <img src={imageURL()} className="catImage" alt="a cat" />
          : <p>Press "New Cat" to get started!</p>
        }
      </div>
    </>
  );
}

export default App;
