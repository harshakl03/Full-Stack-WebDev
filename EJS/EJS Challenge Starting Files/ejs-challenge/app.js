//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose =require("mongoose");

main().catch(err=> console.log(err));

async function main(){
  await mongoose.connect("mongodb://127.0.0.1/blog");
  const contentSchema = new mongoose.Schema({
    title: String,
    atitle: String,
    body: String
  });

  const Content = new mongoose.model("Content", contentSchema);
  const Post = new mongoose.model("Post", contentSchema);

  const home = new Post({
    title: "Home",
    atitle: "Home",
    body: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
  });

  const about = new Content({
    title: "about",
    atitle: "about",
    body: "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
  });

  const contact = new Content({
    title: "contact",
    atitle: "contact",
    body: "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."
  });

  const content=[about, contact];
  const homePost=[home];

  const app = express();

  app.set('view engine', 'ejs');

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static("public"));

  app.get("/",async function(req,res){
    await Post.find({}).then(async function(list){
    if(list.length === 0){
      await Content.insertMany(content).then(console.log("Successful")).catch(err=> {console.log(err)});
      await Post.insertMany(homePost).then(console.log("Home successful")).catch(err=> {console.log(err)});
      res.redirect("/")
    }else{
      await Post.find({}).then(function(list){
        res.render("home" , {sendPost: list});
      });
    }
  });
  });

app.get("/about",async function(req,res){
  await Content.findOne({title: "about"}).then(function(list){
    res.render("about",{about: list.body});
  }).catch(err=> {console.log(err)});
});



app.get("/contact",async function(req,res){
  await Content.findOne({title: "contact"}).then(function(list){
    res.render("contact",{contact: list.body});
  }).catch(err=> {console.log(err)});
});

app.get("/compose",function(req,res){
  res.render("compose");
})



app.post("/compose",async function(req,res){
  const post = new Post({
    title : lodash.lowerCase(req.body.postTitle),
    atitle: req.body.postTitle,
    body : req.body.postCompose
  });
  await Post.create(post).then(console.log("Inserted new post")).catch(err=> {console.log(err)});
  res.redirect("/");
});

app.get("/posts/:takeInput",async function(req,res){
  const requestedTitle = lodash.lowerCase(req.params.takeInput);
  await Post.findOne({title: requestedTitle}).then(function(list){
    const storedTitle = lodash.lowerCase(list.title);
    if( storedTitle === requestedTitle){
      res.render("post", {postTitleValue : list.atitle , postComposeValue : list.body});
    }
  }).catch(err=> {console.log(err)});
  });








app.listen(3000, function() {
  console.log("Server started on port 3000");
});

}

/* 
 */