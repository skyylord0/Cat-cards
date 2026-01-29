import { useState, useEffect } from 'react'
import './ImageScroller.css'

let startIndex = 0;
let batchSize = 20;

export default function ImageScroller(props){
	
	const [images, setImageList] = useState([]);
	const url = props.url;
	
	useEffect(
		()=>{
			setImageList([]);
			generateImage(url,setImageList)
		},[url]
	);
	
	return (
	<div className="scroller">
	{
		images.map((image)=>
			<div className="card">
				<img src={image} className="catImage"></img>
			</div>
		)
	}
	</div>);
}

async function generateImage(url,setImageList){
	let finalUrl = url;
	if (url.includes('?')){
		finalUrl+=`&skip=${startIndex}&limit=${batchSize}`;
	} else {
		finalUrl+=`?skip=${startIndex}&limit=${batchSize}`;
	}
	const response = await fetch(finalUrl);
	const body = await response.json();
	const imageArray = body.map(cat => `https://cataas.com/cat/${cat.id}`);
	setImageList(imageArray);
}