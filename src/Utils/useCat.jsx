import { useState, useEffect } from 'react'

function useCat(type, tag){
    const [catId, setCatId] = useState(null);   // pinned cat ID
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");       // validated caption
    const [inputText, setInputText] = useState(""); // live typing

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

        console.log(base);
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

    return { 
        catId, 
        loading, 
        inputText, 
        setInputText, 
        handleNewCat, 
        handleAddCaption, 
        handleDownload, 
        currentImage: imageURL() 
    };
}

export default useCat;