import { useState } from "react";

export default function Search_bar({onSearch, tags}) {
//State
const [value, setValue] = useState("");

// function to generate cat image with 'enter' key
function generateCatTags(event) {
  if (event.code !== "Enter") {
        return
    }

  // Retrieve the content of the tag search bar 
  const content = event.target.value;
  onSearch(content)
}

// -------------------------------
// auto-completion 
// (depending what is typed in search bar / without clicking enter)
// get the input? 

const suggestion = tags.filter((t) =>
// value ? 
  t.toLowerCase().startsWith(value.toLowerCase())) // return bool 

  return (
    <div>
      <input
      type="text" 
      id="search_input" 
      onKeyUp = {generateCatTags} 
      /* write in the input */ 
      onChange={(e) => setValue(e.target.value)}
      placeholder = "Search by tag(s)"
      />

      /* show list suggestion */
      {value !== "" && (
      <ul className = "suggestion"> 
      /* for each elt */ 
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

