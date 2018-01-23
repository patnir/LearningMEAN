var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var names = ["Tony", "Warren", "Charlie", "Arthur", "Michelle", "Teresa"];


app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    //res.send("welcome to the home page");
    res.render("home");
});

app.get("/friends", function(req, res) {
    res.render("friends", {names: names});

});

app.post("/addFriend", function(req, res) {
	console.log(req.body.friendName);
	names.push(req.body.friendName);
    //res.send("Add friend");
    res.redirect("/friends")
});


app.get("*", function(req, res) {
    res.send("Page not found");
});

app.listen(3000, function() {
    console.log("listening on port 3000");
});