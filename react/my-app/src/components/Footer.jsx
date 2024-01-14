import React from "react";

const year = new Date().getFullYear();
console.log(year);

const footStyle = {
    textAlign: "center",
    color: "#ccc"
};

const Footer = () => {
    return(<p style={footStyle}>Copyright {year}</p>);
}

export default Footer;