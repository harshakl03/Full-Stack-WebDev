const express = require("express");
const app = express();
app.get("/",function(request,response){
    response.send("Aye vediya");
});

app.get("/about",function(req,res){
    res.send("<h3>Hey Everyone. My self Harsha K L. I'm the one who gonna be world's best IGL of Valorant</h3>");
});

app.listen(3000, function(){
    console.log("Server Started");
});

