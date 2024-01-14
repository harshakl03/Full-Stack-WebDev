import React, { useState } from "react";
import "./styles.css";
import Image from "./image"
import imageList from "./images";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';


function App() {

  const [state, setState] = useState(1);

  function next(){
    if(state !== imageList.length){
      setState(state+1);
    }else if(state === imageList.length){
      setState(1);
    }
  }

  function prev(){
    if(state !== 1){
      setState(state-1);
    }else if(state === 1){
      setState(imageList.length);
    }
  }

  return (
    <div className="App">
      <div className="img-div">
       <Image 
       imgState = {state}
       />
      </div>
      <div className="btn-div">
       {imageList.map((image,index)=> <HorizontalRuleIcon className={state===index+1?"hor-btn" : "hide-hor-btn"}/>)}
        <ArrowBackIosIcon className="btn-left" onClick={prev}/>
        <ArrowForwardIosIcon className="btn-right" onClick={next}/> 
      </div>
    </div>
  );
}

export default App;

