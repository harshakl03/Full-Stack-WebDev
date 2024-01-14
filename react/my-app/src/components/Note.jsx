import React from "react";

const noteTitle = {
    color: "black",
    fontFamily: "Montserrat",
    margin:0,
    fontSize: "1.1em"
};

const noteContent = {
    color: "gray",
    fontFamily: "Montserrat",
    margin:0,
    fontSize: "1.1em"
};

const noteStyle = {
    backgroundColor: "#fff",
    borderRadius: "7px",
    padding: "10px",
    width: "240px",
    margin: "16px",
    float: "left"
};

const Note = () => {
    return(
        <div style={noteStyle}>
            <h1 style={noteTitle}>This is for Title</h1>
            <p style={noteContent}>This is for note</p>
        </div>
    )
}

export default Note;