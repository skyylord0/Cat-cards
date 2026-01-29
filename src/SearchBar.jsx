function Search_bar() {

  return (
      <input type="text" id="search_input" onKeyUp = {generateCatTags} placeholder="Search.."/>
)

function generateCatTags(event) {
  if (event.code !== "Enter") {
        return
    }


  const content = event.target.value;
  const url = `https://cataas.com/api/cats?tags=${content}`
  console.log(url);
  
}

}


export default Search_bar