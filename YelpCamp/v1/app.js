var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "CG1", image: "https://images.unsplash.com/photo-1439946612398-57d8d0ac915d?ixlib=rb-0.3.5&s=4005af16c32eb614cb5537b43b45cd7b&auto=format&fit=crop&w=1050&q=80"},
    {name: "CG2", image: "https://images.unsplash.com/photo-1486692957922-ea51ea8472bc?auto=format&fit=crop&w=1073&q=80"}, 
    {name: "CG3", image: "https://images.unsplash.com/photo-1504519733529-35b35d10eee2?auto=format&fit=crop&w=1051&q=80"}, 
    {name: "CG4", image: "https://images.unsplash.com/photo-1459292414836-763d35c7ae4c?ixlib=rb-0.3.5&s=bd02951bae92abbc4f5aad65b08f0a74&auto=format&fit=crop&w=1050&q=80"}
]

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
    //res.send("You hit the post route");
    // get data from form and add to campground array
    // redirect to campgrounds 
    var name = req.body.name;
    var image = req.body.image;
    var newcamp = {name: name, image: image};
    campgrounds.push(newcamp);
    res.redirect("/campgrounds")
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new_campground");
});


app.get("*", function(req, res) {
    res.redirect("/");
});

app.listen(3000, function(req, res) {
    console.log("Started YelpCamp V1 Server");
});