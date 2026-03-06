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
  const [tag, setTag] = useState(""); // default -> no tag 
  const [listDisplay, setListDisplay] = useState(false) // Set wether to use the list or single image display

  //Fetch cat
  const { 
    catId, setCatId, loading, inputText, setInputText, 
    handleNewCat, handleNewCats, handlePreviousCats, handleNextCats,
    handleAddCaption, handleDownload, 
    currentImage, catImageList, catIdList
  } = useCat(type, tag);

  //Fetch cat when tag changes
  useEffect(() => {
    if (tag !== "") {
      handleNewCat(tag);
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
                <button onClick={handleNextCats}>
                  Next 20 cats 🐱
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