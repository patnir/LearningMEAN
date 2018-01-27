var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

// POST
var postSchema = mongoose.Schema({
    title: String, 
    comment: String
}); 

var Post = mongoose.model("Post", postSchema);


// USER - email, name
var userSchema = new mongoose.Schema({
    email: String, 
    name: String, 
    posts: [postSchema]
});


var User = mongoose.model("User", userSchema);


// var newUser = new User({
//     email: "desai42@purdue.edu", 
//     name: "Viraj Desai"
// });

// newUser.posts.push({
//     title: "how to trade cryptos",
//     comment: "you gotta loose a lot of money first"
// })

// newUser.save(function(err, user) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(user);
//     }
// });

User.findOne({name: "Viraj Desai"}, function(err, user) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(user);
        user.posts.push( {
            title: "how to trade part 2", 
            comment: "you gonna loose, leave"
        });

        user.save(function(err, saveduser) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(saveduser);
            }
        });
    }
});
