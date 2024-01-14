import React from "react";
import imageList from "./images"
import "./styles.css"

const Image = (props) => {
 return  imageList.map((image,index) => 
 <img src={image.imgUrl} alt={image.key} class={props.imgState === index+1? "img-show" : "img-hide" } /> )
}

export default Image;