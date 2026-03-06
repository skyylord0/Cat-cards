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
    catId, loading, inputText, setInputText, 
    handleNewCat, handleAddCaption, handleDownload, currentImage 
  } = useCat(type, tag);

  //Fetch cat when tag changes
  useEffect(() => {
    if (tag !== "") {
      handleNewCat(tag);
    }
  }, [tag]);

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
            {!listDisplay && (
              <>
                <Search_bar onSearch={setTag}/>

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
            )}
          </div>
        </div>
        
        <div className="displayArea">
          {listDisplay ? (
            <CardList />
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