const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var items = ["Go to College.","Complete your course","Complete your homework"];
var witems = [];

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    var today = new Date();
    var currentDay = today.getDay();
    var toda = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

/* if(currentDay === 6 || currentDay === 0){
    currentDay="Weekend";
}else{
   currentDay="Weekday";
}
res.render("lists", {day : currentDay}); */

res.render("lists", {day : toda[currentDay] , adding: items});

});

app.get("/work", function(req,res){
    res.render("lists", {day : "Work" , adding: witems});
});

app.get("/about",function(req,res){
    res.render("about");
})

app.post("/",function(req,res){
    var item = req.body.type;
    if( req.body.list === 'Work'){
        witems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
})

app.post("/work" , function(req,res){
    let items = req.body.type;
    witems.push(items);
    res.redirect("/work");
});

app.listen(3000, function(){
    console.log("Server is running at port 3000");
});