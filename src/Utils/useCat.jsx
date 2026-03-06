import { useState, useEffect } from 'react'

function useCat(type, tag){
    const [catId, setCatId] = useState(null);   // pinned cat ID
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");       // validated caption
    const [inputText, setInputText] = useState(""); // live typing
    const [catsInfo, setCatsInfo] = useState(null) //Only used for the list display
    const [currentIndex, setCurrentIndex] = useState(0)

    const batchSize = 20; //Size of each batch of cat fetched when in list display

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
        // if (tag) { endpoint = `https://cataas.com/api/cats?tags=${tag}&skip=0&limit=1`}
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

    // Set the list to the previous batch of cats
    function handlePreviousCats(){
        if (currentIndex < batchSize) return
        handleNewCats(currentIndex-batchSize)
        setCurrentIndex(currentIndex-batchSize)
    }

    // Set the list to the next batch of cats
    function handleNextCats(){
        handleNewCats(currentIndex+batchSize)
        setCurrentIndex(currentIndex+batchSize)
    }

    // Fetch a list of cats as a json object stored in catsInfo
    async function handleNewCats(index = currentIndex){
        setLoading(true);
        setText("");
        setInputText("");
        
        let endpoint;

        if (tag&&type=="gif") { endpoint = `https://cataas.com/api/cats?tags=gif,${tag}&`}
        else if (tag) {endpoint = `https://cataas.com/api/cats?tags=${tag}&`}
        else if (type=="gif") {endpoint = `https://cataas.com/api/cats?tags=gif&`}
        else {endpoint = `https://cataas.com/api/cats?`}

        endpoint += `skip=${index}&limit=${batchSize}`

        console.log(endpoint)

        try {
            const res = await fetch(endpoint);
            const jsonData = await res.json();
            setCatsInfo(jsonData)
        } catch (err) {
        console.error("Failed to fetch cat:", err);
        } finally {
        setLoading(false);
        }
    }

    // Return a list of images to load when in list display mode
    function imageList(){
        if (!catsInfo) return null;
        let base = "https://cataas.com/cat/";

        const catImageList = [];
        const catIdList = [];
        
        // Ensure we don't exceed the batch size or the available data length
        const limit = Math.min(batchSize, catsInfo.length)

        for(let i=0; i < limit; i++){
            catImageList.push(base + catsInfo[i].id);
            catIdList.push(catsInfo[i].id)
        }
        return {catImageList, catIdList};

    }

    // Get the image URL corresponding to the current cat
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

        return base;
    }

    // Apply caption to the current cat (no new fetch = same cat)
    function handleAddCaption() {
        setText(inputText);
    }

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

    const { catImageList, catIdList } = imageList() || { catImageList: null, catIdList: null };

    return { 
        catId,
        setCatId,
        loading, 
        inputText, 
        setInputText, 
        handleNewCat,
        handleNewCats,
        handlePreviousCats,
        handleNextCats,
        handleAddCaption, 
        handleDownload, 
        currentImage: imageURL(),
        catImageList,
        catIdList
    };
}

export default useCat;