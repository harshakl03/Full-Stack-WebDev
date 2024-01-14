//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

main().catch(err=> console.log(err));

async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/toDoListDB" , {useNewUrlParser : true});

  const itemSchema = new mongoose.Schema({
    name : String
  });
  
  const Item = mongoose.model("Item" , itemSchema);
  
  const item1 = new Item({
    name: "Welcome to your TODO List"
  });
  
  const item2 = new Item({
    name: "Hit + to add more items"
  });
  
  const item3 = new Item({
    name: "<--- Hit this to delete item"
  });
  
  let ditems = [item1,item2,item3];
  
  const listSchema = {
    name: String,
    items : [itemSchema]
  }

  const List = mongoose.model("List" , listSchema);


  app.get("/", async function(req,res){
    await Item.find({}).then(async function(items){
      if(items.length === 0){
        console.log("pre");
        await Item.insertMany(ditems).then(console.log("Inserted")).catch(err => {console.log(err)});
        res.redirect("/");
      }else{
        res.render("list", {listTitle: "Today", newListItems: items});
      }
    })
    .catch(err=> {console.log(err)});
    });

  

  app.post("/", async function(req, res){

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
      name: itemName
    });

    if(listName === "Today"){
      item.save();
      res.redirect("/");
    }else{
      await List.findOne({name: listName}).then(function(flist){
        flist.items.push(item);
        flist.save();
        res.redirect("/"+listName);
      })
    }
  });

  app.post("/delete", async function(req,res){
    const checkID= req.body.check;
    const listName = req.body.hiddentb;
    if(listName === "Today"){
        await Item.findByIdAndRemove(checkID);
        res.redirect("/");
      }else{
        await List.findOneAndUpdate({name: listName}, {$pull: {items: {_id : checkID }}});
        res.redirect("/" + listName);
      }
});

  
  app.get("/:route", async function(req,res){
    const route = _.capitalize(req.params.route);

    await List.findOne({name: route}).then(function(list){
      if(!list){
        const list = new List({
            name: route,
            items: ditems
        });
        list.save();
        res.redirect("/"+route);
      }else{
        res.render("list", {listTitle: list.name, newListItems: list.items});
      }
    })
    .catch(err=> {console.log(err)});

    
  });
  
  app.get("/about", function(req, res){
    res.render("about");
  });
  
  app.listen(3000, function() {
    console.log("Server started on port 3000");
  });

  
}


