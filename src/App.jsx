import { useState, useEffect } from 'react'
import './Style/App.css'
import Search_bar from './Components/SearchBar'
import SelectType from './Components/SelectType'
import AddText from './Components/AddText';
import CardList from './Components/CardList';
import ToggleButton from './Components/ToggleButton'
import useCat from './Utils/useCat'


function App() {
  const [type, setType] = useState("image"); // default = static image
<<<<<<< HEAD
  const [text, setText] = useState("");       // validated caption
  const [inputText, setInputText] = useState(""); // live typing
  const [catId, setCatId] = useState(null);   // pinned cat ID
  const [loading, setLoading] = useState(false);
  // TAG 
  const [tag, setTag] = useState(""); // default -> no tag 
  const [allTags, setAllTags] = useState([]);

  const [listDisplay, setListDisplay] = useState(false)
=======
  const [tag, setTag] = useState(""); // default -> no tag 
  const [listDisplay, setListDisplay] = useState(false) // Set wether to use the list or single image display
>>>>>>> main

  //Fetch cat
  const { 
    catId, setCatId, loading, inputText, setInputText, 
    handleNewCat, handleNewCats, handlePreviousCats, handleNextCats,
    handleAddCaption, handleDownload, 
    currentImage, catImageList, catIdList
  } = useCat(type, tag);

<<<<<<< HEAD
    // use effect (tag)
    useEffect(() => {
      if (tag !== "") {
        handleNewCat(tag);
        console.log(tag);
      }
    }, [tag]);

    // useEffect (fetchTags) 
    // Initial fetch, first time
    useEffect(() => {
      // fetchTags function via API 
      async function fetchTags() {
        try {
          const res = await fetch("https://cataas.com/api/tags");
          const data = await res.json();

          //Store data in allTags 
          setAllTags(data)
        }
        catch (err) {
          console.error("Failed to fetch tags", err);
        }
      }
      fetchTags();
    }, [])



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
=======
  //Fetch cat when tag changes
  useEffect(() => {
    if (tag !== "") {
      handleNewCat(tag);
>>>>>>> main
    }
  }, [tag]);

  //Fetch cats when list display is first activated
  useEffect(() => {
    if (listDisplay) {
      handleNewCats();
    }
  }, [listDisplay]);

  return (
    <div className="application">
      <div className="title">Get images of cats !</div>
      <div className="mainWindow">
        <div className="toolbox">
          <div className='listDisplay'>
            <ToggleButton
              listDisplay={listDisplay}
              onListDisplayChange={setListDisplay}
            />
          </div>
          <div className="imageToolBox">
            <SelectType onTypeChange={setType} />
            <Search_bar onSearch={setTag}/>
            {!listDisplay ? (
              <>
                <button onClick={handleNewCat} disabled={loading}>
                  {loading ? "Loading..." : "🐱 New Cat"}
                </button>
            
                <AddText
                  inputText={inputText}
                  onInputChange={setInputText}
                  onValidate={handleAddCaption}
                />

                <button onClick={handleAddCaption} disabled={!catId}>💬 Add Caption</button>
                <button onClick={handleDownload} disabled={!catId}>⬇️ Download</button>
              </>
            ) : (
              <>
                <button onClick={handlePreviousCats}>
                  Previous 20 cats 🐱
                </button>
<<<<<<< HEAD
                  <Search_bar 
                  onSearch={handleAddTag}
                  tags={allTags}
                  />
                
                <button onClick={handleDownload} disabled={!catId}>
                ⬇️ Download
=======
                <button onClick={handleNextCats}>
                  Next 20 cats 🐱
>>>>>>> main
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="displayArea">
          {listDisplay ? (
            catImageList ? (
                <CardList 
                  imageList={catImageList}
                  idList={catIdList}
                  onImageClickIdChange={setCatId}
                  onImageClickDisplayChange={setListDisplay}/>
            ) : (
                <div className="loader-container">
                    <p>Loading...</p>
                </div>
            )    
          ) : (
            <div className="card">
              {catId ? (
                <img src={currentImage} className="catImage" alt="a cat" />
              ) : (
                <p>Press "New Cat" to get started!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;