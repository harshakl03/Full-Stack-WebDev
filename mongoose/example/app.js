
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB",{useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);
const fruit = new Fruit({
    name: "Apple",
    rating: 9,
    review: "Super good"
});

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require : true
    },
    age: Number
});

const Person = new mongoose.model("Person", personSchema);

const person = new Person({
    age: 45
});

//person.save();

//fruit.save(); 
const arman = new Person(
    {
        name: "Arman",
        age: 20
    }
);

const gagan = new Person(
    {
        name: "Gagan",
        age: 30
    }
);

//Person.insertMany([arman,gagan]);

//Person.updateOne({id: 3} , {$set: {"name": "Varun"}});

//Person.findByIdAndUpdate(3,  {$set: {name : "Varun"}} );

Person.deleteOne({name: "Gagan"});

/* Person.find({}).then(function(person){
    person.forEach(function(person){
        console.log(person.name);
    });
})
.catch(function(err){
    console.log(err);
}); */

