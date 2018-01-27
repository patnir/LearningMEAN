var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_3");

var Post = require("./models/post");
var User = require("./models/user");

// // POST
// var postSchema = mongoose.Schema({
//     title: String, 
//     comment: String
// }); 

// var Post = mongoose.model("Post", postSchema);


// USER - email, name
// var userSchema = new mongoose.Schema({
//     email: String, 
//     name: String, 
//     posts: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Post"
//         }
//     ]
// });

// var User = mongoose.model("User", userSchema);

// User.create({
//     name: "Bob Boy", 
//     email: "bob@gmail.com"
// });

// Post.create({
//     title: "hwo to cook the best burger part 4", 
//     comment: "bread + bun + meat + pickels"
// }, function(err, post) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(post);
//         User.findOne({
//             email: "bob@gmail.com"}, function(err, foundUser) {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 foundUser.posts.push(post);
//                 foundUser.save(function(err, data) {
//                     if (err) {
//                         console.log(err);
//                     }
//                     else {
//                         console.log(data);
//                     }
//                 });
//             }
//         });
//     }
// });

// User.findOne({email: "bob@gmail.com"}, function(err, user) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(user);

//     }
// });

User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user) {
    if(err) {
        console.log(err);
    } else {
        console.log(user);
    }
});

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

// User.findOne({name: "Viraj Desai"}, function(err, user) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(user);
//         user.posts.push( {
//             title: "how to trade part 2", 
//             comment: "you gonna loose, leave"
//         });

//         user.save(function(err, saveduser) {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log(saveduser);
//             }
//         });
//     }
// });
