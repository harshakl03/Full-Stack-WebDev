const express=require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const cityName = req.body.cityName;
    const appid= "bfa6b6c4546fc8bf772fbebbc1fe7f08";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+appid+"&units=metric#";
    https.get(url,function(resp){
        console.log(resp.statusCode);
        resp.on("data",function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const weatherTemp = weatherData.main.temp;
            const icon = "https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            const weatherDescription = weatherData.weather[0].description;
            res.write("<h1> The weather currently is "+weatherDescription+"</h1>");
            res.write("<h1>The temperature in "+cityName+" is "+weatherTemp+" degrees Celcius</h1>");
            res.write("<img src="+icon+">");
            res.send();
        });
    });
});



app.listen(3000,function(){
    console.log("Server started at 3000");
});