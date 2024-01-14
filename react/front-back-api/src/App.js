import React, { useEffect, useState } from "react";

const App = () =>{

  const [state, setState] = useState(1);
  const [message, setMessage]= useState("");
  const route = "H";

  const fetchData = (url,meth) =>{
    fetch(url,  meth)
    .then((res)=> res.json())
    .then((data)=> setMessage(data.message))
    .catch(err=>console.log(err))
    setState(!state);
  }

  const clicked = (event) => {
    const val = event.target.value
    const url = route === val ? "http://localhost:8000" : "http://localhost:8000/contact";
    const meth = state? {method: "GET"} : 
    {
      method: "POST", 
      body: JSON.stringify({message: val+"Posted"}), 
      headers:{'Content-type':'application/json; charset=UTF-8'}
    };
    fetchData(url,meth);
    event.preventDefault();
  }

  return (
  <div>
    <h1>Hello {message}</h1>
    <button onClick={clicked} value="H">Click Here To Switch Home GET And POST</button>
    <button onClick={clicked} value="C">Click Here To GET contact</button>
  </div>)
}

export default App;