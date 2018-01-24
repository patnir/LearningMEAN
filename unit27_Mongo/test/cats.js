var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String, 
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

var george = new Cat({
    name: "Mrs. Norris", 
    age: 10, 
    temperament: "Sleepy"
});

// george.save(function(err, cat) {
//     if(err) {
//         console.log("Something went wrong with save");
//     }
//     else {
//         console.log("saved cat");
//     }
// });

// Cat.find({}, function(err, cat) {
//     if(err) {
//         console.log("Something went wrong with find");
//     }
//     else {
//         console.log("found cat");
//         console.log(cat)
//     }
// });

Cat.create({
    name: "Snow White",
    age: 15, 
    temperament: "Nice"
}, function(err, cat) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(cat);
    }
});