import { useState } from "react";

export default function Search_bar({onSearch, tags}) {
const [value, setValue] = useState("");

// function to generate cat image with 'enter' key
function generateCatTags(event) {
  if (event.code !== "Enter") {
        return
    }
  onSearch(value)
  setValue("") 
}

// -------------------------------
// Suggestion list (case-insensitive)
const suggestion = tags.filter((t) =>
  t.toLowerCase().startsWith(value.toLowerCase())) 


//-------------------------------
// Click on the suggestion 
function handleClickSuggestion(tag) {
  setValue(tag); // update the var. tag
  onSearch(tag); // fetch the cat corresponding the tag 
  setValue(""); 
}

// Clear the search and reset the tag 
function handleClear() {
  setValue("");
  onSearch("");
}


  return (
    <div className = "search-container">
      <input
      type="text" 
      id="search_input" 
      onKeyUp = {generateCatTags} 

      onChange={(e) => setValue(e.target.value)}
      value={value}
      placeholder = "Search by tag(s)"
      />

      <button onClick={handleClear} title = "Clear tag">
        Clear tag(s)
      </button>

      {value !== "" && (
      <ul className = "suggestion"> 

      {suggestion.map((tag) => 
      (
        <li 
        key = {tag} 
        onClick={() => handleClickSuggestion(tag)} >
        {tag}
        </li>
      )

      )}

      </ul> 

      )}
      

    </div>
      
)
}

