var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    author: String,
    text: String
});

var Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;