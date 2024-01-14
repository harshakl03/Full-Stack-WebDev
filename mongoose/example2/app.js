const mongoose = require('mongoose');

main().catch(err=> console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/PersonDB');
    const personSchema  = new mongoose.Schema({
        name: String,
        age: Number,
        id: Number
    });

    const Person = new mongoose.model("Person", personSchema);

    let person = new Person({
        name: "Varun",
        age: 20
    });

const arr = [person];

    Person.insertMany(arr).then(console.log("Success")).catch(err=> {console.log(err)});
    await mongoose.connection.close();
}