
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

main().catch(err=> console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');
    app.set('view engine','ejs');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static('public'));

    const articleSchema = new mongoose.Schema({
        title: String,
        content: String
    });

    const Article = new mongoose.model("Article" , articleSchema);

    app.route("/articles")
      .get(async function(req,res){
        Article.find().then(list => {
            res.send(list);
        }).catch(err=> {console.log(err)});
       })
      .post( async function(req,res){
        const newArticle = new Article({
            title : req.body.title,
            content : req.body.content
        });
        await newArticle.save().then(res.send("Success")).catch(err => {res.send(err)});
      })
      .delete( async function(req,res){
        await Article.deleteMany({}).then(res.send("Success")).catch(err => {res.send(err)});
      });

    app.route("/articles/:articleTitle")
       
      .get(async function(req,res){
        await Article.findOne({title : req.params.articleTitle}).then( function(list){ res.send(list) }).catch( err=> {console.log(err); res.send("Such article doesn't exist")});
      })

      .put(async function(req,res){
        await Article.findOneAndUpdate({title: req.params.articleTitle},{title: req.body.tite , content: req.body.content},{new: true , overwrite: true , upsert : false , remove:false, fields:{}})
        .then(res.send("Successfully put"))
        .catch(err => {console.log(err);});
        console.log(req.body);
      })

      .delete(async function(req,res){
        await Article.findOneAndDelete({title: req.params.articleTitle})
        .then(res.send("Success delete"))
        .catch(err=> {console.log(err);})
      })

    app.listen(3000, function(){
       console.log("Server started at port 3000");
    });
}


/* 

*/
