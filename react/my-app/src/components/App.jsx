import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";


const App = () =>{
    return(
        <div>
        <Header></Header>
        <Note></Note>
        </div>
    )
}

const Foot = () => {
    return(<Footer></Footer>)
}

export  {App , Foot};