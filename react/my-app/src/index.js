import React from "react";
import ReactDOM from "react-dom/client";
import {App,Foot} from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const foot = ReactDOM.createRoot(document.getElementById("foot"));

root.render(
    <App />
);

foot.render(
    <Foot></Foot>
)