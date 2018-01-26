var express = require("express");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

var blogSchema = new mongoose.Schema({
    title: String, 
    image: String, 
    body: String, 
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res) {
    res.redirect("/blogs");
})

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log("error with /blogs " + err);
        } else {
            res.render("index", {blogs: blogs});
        }
    })
});
 
app.get("/blogs/new", function(req, res) {
    res.render("new.ejs");
});

app.post("/blogs", function(req, res) {
    var data = {};
    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            console.log("Error with blogs post " + err);
        } else {
            res.redirect("/blogs");
        }
    })
});

app.get("/blogs/:id", function(req, res) {
    //res.send("show page");
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            console.log("error with show page" + err);
            res.redirect("/blogs");
        }
        else {
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            console.log("error with edit page" + err);
            res.redirect("/blogs");
        }
        else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE
app.put("/blogs/:id", function(req, res) {
    //res.send("UPDATE ROUTE + " + req.params.id);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if(err) {
            console.log("error with update page" + err);
            res.redirect("/blogs");
        }
        else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

app.listen(3000, function() {
    console.log("Blog App Running")
});

// Blog.create({
//     title: "Test Blog",
//     image: "https://goo.gl/Mqrke4",
//     body: "Hello this is a blog post"
// });