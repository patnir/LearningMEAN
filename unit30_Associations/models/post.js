var mongoose = require("mongoose");

// POST
var postSchema = mongoose.Schema({
    title: String, 
    comment: String
}); 

var Post = mongoose.model("Post", postSchema);

module.exports = Post;