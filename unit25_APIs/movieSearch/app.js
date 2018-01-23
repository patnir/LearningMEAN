var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

var searchTerm = "start";

app.get("/", function(req, res) {
    res.render("search");
});

app.get("/results", function(req, res) {
    searchTerm = req.query.search;
    //console.log(req);
    if (searchTerm === "" || searchTerm == "undefined") {
        searchTerm = "start";
    }
    var searchRoute = "http://omdbapi.com/?s=" + searchTerm + "&apikey=thewdb";
    request(searchRoute, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            //res.send(body);
            var parsedData = JSON.parse(body);
            if (parsedData["Response"] == "False") {
                res.send("<h1>No Moview Found!</h1>");
            }
            else {
                res.render("results", {data: parsedData});
            }
        }
        else {
            res.send(error);
        }
    });
});

app.post("/getResult", function(req, res) {
    res.redirect("/results");
});

app.get("*", function(req, res) {
    res.send("Error!");
})

app.listen(3000, function() {
    console.log("listening on port 3000");
});