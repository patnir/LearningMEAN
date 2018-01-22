var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    //res.send("welcome to the home page");
    res.render("home");
});

app.get("/filw/:thing", function(req, res) {
    //res.send("welcome to the home page");
    var thing = req.params.thing;
    //res.send("You fell in love with " + thing);
    res.render("love.ejs", {thingVar: thing});
});

app.get("/posts", function(req, res) {
	var posts = [
		{title: "post 1", autor: "susy"},
		{title: "post 2", autor: "rahul"},
		{title: "post 3", autor: "isabel"},
		{title: "post 4", autor: "caro"}
	];
	res.render("posts.ejs", {posts: posts});
});

app.get("*", function(req, res) {
    res.send("Page not found");
});

app.listen(3000, function() {
    console.log("listening on port 3000");
});