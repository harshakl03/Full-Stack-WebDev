import React from "react";

const HeaderStyle = {
    backgroundColor : "#f5ba13",
    padding: "16px 32px",
    margin: "auto -16px",
    fontFamily: "Calibri",
    color : "white",
    fontSize: "2em"
};

const Header =  () => {
    return (<h1 style={HeaderStyle}>Keeper</h1>);
}

export default Header;