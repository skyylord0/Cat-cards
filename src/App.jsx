import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Search_bar from './SearchBar'
import SelectType from './SelectType'
import AddText from './AddText';

function App() {
  const [type, setType] = useState("image"); // default = static image
  const [text, setText] = useState("");       // validated caption
  const [inputText, setInputText] = useState(""); // live typing
  const [catId, setCatId] = useState(null);   // pinned cat ID
  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState(""); // default -> no tag 

    // use effect (tag)
    useEffect(() => {
      if (tag !== "") {
        handleNewCat(tag);
        console.log(tag);
      }
    }, [tag]);

  // Fetch a new random cat and store its ID
  async function handleNewCat() {
    setLoading(true);
    setText("");
    setInputText("");

    let endpoint = type === "gif"
      ? "https://cataas.com/cat/gif?json=true"
      : "https://cataas.com/cat?json=true";

    // add tag in the URL 
    // if (tag) { endpoint += `&tags=${tag}`; }
    //if (tag) { endpoint = `https://cataas.com/api/cats?tags=${tag}&skip=0&limit=1`}
    if (tag) { endpoint = `https://cataas.com/api/cats?tags=${tag}`}
    console.log(endpoint)

    try {
      const res = await fetch(endpoint);
      const jsonData = await res.json();

      // Cas du tag 
      if (Array.isArray(jsonData)) {
        // Si la jsonData un array (cas du tag), on choisit au hasard l'index 
       const randomIndex = Math.floor(Math.random() * jsonData.length)  
        setCatId(jsonData[randomIndex].id) 
        console.log(randomIndex)
      }
      else 
        // Cas sans tag 
      {setCatId(jsonData.id)}

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

  // tag function 
  function handleAddTag(content) {
    setTag(content); // tag
    console.log("tag", content)
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
        <Search_bar
          onSearch={handleAddTag}
        />
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
