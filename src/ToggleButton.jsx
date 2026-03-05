import { useState } from 'react'
import listLogo from './assets/list_icon.png';

function ToggleButton({onListDisplayChange}){
  const [listDisplay, setListDisplay] = useState(false);

  const handleDisplayChange = () => {
    onListDisplayChange(!listDisplay);
    setListDisplay(!listDisplay);
  }

  return (
    <button
      style = {{
      backgroundColor: listDisplay ? "#d3d3d3" : "#8a8a8a",
      border: listDisplay ? "3px solid white" : "1px solid transparent",
    }}
      onClick={handleDisplayChange}
    >
      <img src={listLogo} alt="list logo" className='icon-small'/>
    </button>
  );
}

export default ToggleButton;