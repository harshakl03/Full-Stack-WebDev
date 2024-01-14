const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.route('/')
.get(async (req,res)=>{
    res.json({message:"Home"});
})
.post(async (req,res)=>{
    //res.json({message:"HPost"});
    res.json(req.body);
});

app.route('/contact')
.get(async (req,res)=>{
    res.json({message:"Contact"});
})
.post(async (req,res)=>{
    res.json(req.body);
});

app.listen(8000,()=>{
    console.log('Server is running at port 8000');
});