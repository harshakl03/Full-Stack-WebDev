const express = require("express");
const bodyParser = require("body-parser");
const calculator = express();
calculator.use(bodyParser.urlencoded({extended: true}));

calculator.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

calculator.post("/", function(req,res){
    var num1= Number(req.body.num1);
    var num2= Number(req.body.num2);
    var result = num1+num2;
    res.send("The result of "+num1+" + "+num2+" = "+result);
});

calculator.listen(3000,function(){
    console.log("Server started at 30000");
});

calculator.get("/bmicalculators",function(req,res){
    res.sendFile(__dirname +"/bmicalculator.html" );
});

calculator.post("/bmicalculators",function(req,res){
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);
    var bmi= weight/height;
    res.send("The BMI is "+bmi);
});