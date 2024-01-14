//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const FacebookStrategy = require('passport-facebook');

main().catch(err=> {console.log(err);});

const app =express();

app.use(express.static("public"));
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({
    secret: "Monkey D Luffy",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/userDB");
    const userSchema = new mongoose.Schema({
        username: String,
        password: String,
        googleId: String,
        facebookId: String,
        secret: Array
    });

    userSchema.plugin(passportLocalMongoose);
    userSchema.plugin(findOrCreate);

    const User = new mongoose.model("user" , userSchema);

    passport.use(User.createStrategy());
    passport.serializeUser(function(user , done){
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findById(id)
        .then(function(user){
            done(null, user);
        })
        .catch(err=>{
            done(null , err);
        })
    });

    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/confession",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));

    passport.use(new FacebookStrategy({
        clientID: process.env.APP_ID,
        clientSecret: process.env.APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/confession"
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));

    app.get("/" , function(req,res){
        res.render('home');
    });

    app.get("/register" , function(req,res){
        res.render('register');
    });

    app.get("/login" , function(req,res){
        res.render('login');
    });

    app.get('/logout' , function(req,res){
        req.logout(function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        });
    });

    app.get("/confession" ,async function(req,res){
        await User.find({$or: [{googleId: {$ne: null}} , {facebookId: {$ne: null}} ]})
        .then(function(list){
                res.render('confession' , {userPostedSecrets : list});
        })
        .catch(err=>{console.log(err)});
    });

    app.get('/auth/google',
        passport.authenticate('google' , {scope: ['profile'] , accessType: 'offline' , approvalPrompt: 'force'})
    );

    app.get('/auth/google/confession' , 
        passport.authenticate('google' , {failureRedirect: "/login"}) ,
        function(req,res){
            res.redirect("/confession");
        } 
    );

    app.get('/auth/facebook' , 
        passport.authenticate('facebook')
    );

    app.get('/auth/facebook/confession' , 
        passport.authenticate('facebook' , {failureRedirect: "/login"}),
        function(req,res){
            res.redirect("/confession");
        }
    );

    app.get('/submit' , function(req,res){
        res.render('submit');
    });

    app.post("/register" , async function(req,res){
        User.register({username: req.body.username} , req.body.password)
        .then(function(list){
            passport.authenticate('local')(req , res , function(){
                res.redirect('/confession');
            })
        })
        .catch(err=>{console.log(err);})
    });

    app.post("/login" , async function(req,res){
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        req.login(user , function(err){
            if(err){
                console.log(err);
            }else{
                passport.authenticate('local' , {failureRedirect: '/login' , failureMessage:true })(req,res,function(){
                   res.redirect('/confession');
                });
            }
        });
    });

    app.post('/submit' , async function(req,res){
        if(req.user){
            await User.findById(req.user._id)
            .then(async function(list){
                list.secret.push(req.body.secret);
                await list.save();
                res.redirect('/confession');
            })
            .catch(err=> console.log(err));
        }else{
            res.redirect('/login');
        }
    });

    app.listen(3000 , function(req,res){
        console.log("Successfully running at port 3000");
    });

}
