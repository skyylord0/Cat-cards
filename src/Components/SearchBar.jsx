export default function Search_bar({onSearch}) {

// function to generate cat image with 'enter' key
function generateCatTags(event) {
  if (event.code !== "Enter") {
        return
    }

  // passer le content quelque part avec le parent? 
  const content = event.target.value;
  onSearch(content)
  
}

  return (
      <input 
      type="text" 
      id="search_input" 
      onKeyUp = {generateCatTags} 
      placeholder = "Search by tag(s)"
      />
)
}

