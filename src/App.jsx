import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Search_bar from './SearchBar'
import SelectType from './SelectType'
import AddText from './AddText';
import listLogo from './assets/list_icon.png';

function App() {
  const [type, setType] = useState("image"); // default = static image
  const [text, setText] = useState("");       // validated caption
  const [inputText, setInputText] = useState(""); // live typing
  const [catId, setCatId] = useState(null);   // pinned cat ID
  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState(""); // default -> no tag 
  const [listDisplay, setListDisplay] = useState(false)


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

  const handleDisplayChange = (newListDisplay) => {
    setListDisplay(newListDisplay)
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
    <div className = "application">
      <div className="title">Get images of cats !</div>
      <div className="mainWindow">
        <div className="toolbox">
          <div className="listDisplayBox">
            <ToggleButton onListDisplayChange={handleDisplayChange}/>
          </div>
          <div className="imageToolBox">
            <SelectType onTypeChange={setType} />
            {!listDisplay && (
              <>
                <button onClick={handleNewCat} disabled={loading}>
                  {loading ? "Loading..." : "🐱 New Cat"}
                </button>
                <AddText
                  inputText={inputText}
                  onInputChange={setInputText}
                  onValidate={handleAddCaption}
                />
                <button onClick={handleAddCaption} disabled={!catId}>
                💬 Add Caption
                </button>
                  <Search_bar 
                  onSearch={handleAddTag}/>
                
                <button onClick={handleDownload} disabled={!catId}>
                ⬇️ Download
                </button>
              </>
            )}
          </div>
        </div>

        <div className="card">
          {catId
            ? <img src={imageURL()} className="catImage" alt="a cat" />
            : <p>Press "New Cat" to get started!</p>
          }
        </div>
      </div>
    </div>
  );

  async function handleDownload() {
  const url = imageURL();
  if (!url) return;

  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `cat-${catId}.${type === "gif" ? "gif" : "jpg"}`;
    a.click();

    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed:", err);
  }
  }
}

export function ToggleButton({onListDisplayChange}){
  const [listDisplay, setListDisplay] = useState(false);

  const handleDisplayChange = () => {
    onListDisplayChange(!listDisplay);
    setListDisplay(!listDisplay);
  }

  return (
    <button
      style = {{
      backgroundColor: listDisplay ? "#d3d3d3" : "#8a8a8a",
      border: listDisplay ? "3px solid white" : "1px solid transparent",
    }}
      onClick={handleDisplayChange}
      >
      <img src={listLogo} alt="list logo" className='icon-small'/>
    </button>
  );
}

export default App;