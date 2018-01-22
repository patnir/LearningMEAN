var express = require('express');
var app = express();

app.get("/r/:subredditName", function(req, res) {
    var subreddit = req.params.subredditName;
    res.send("Welcome to the " + subreddit+ " subreddit");
});

app.get("/", function(req, res) {
    res.send("Hi there!");
});

app.get("/bye", function(req, res) {
    res.send("Good bye");
});

app.get("*", function(req, res) {
    console.log(req);
    res.send("NOT FOUND\n");
});

app.listen(3000, function() {
    console.log("Listening on port 3000");
});

