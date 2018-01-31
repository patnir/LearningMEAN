var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");

router.get("/", function(req, res) {
    console.log(req.user);
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log("Error getting campgrounds " + err);
        }
        else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });

   // res.render("campgrounds", {campgrounds: campgrounds});
});

router.post("/", isLoggedIn, function(req, res) {
    //res.send("You hit the post route");
    // get data from form and add to campground array
    // redirect to campgrounds 
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newcamp = {name: name, image: image, description: description};
    //campgrounds.push(newcamp);

    Campground.create(newcamp, function(err, newCamp) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("CREATED campground");
            res.redirect("/campgrounds")
        }
    });
});

router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res) {
    //res.send("This will be the showpage one day");
    var id = req.params.id;
    console.log(id);

    Campground.findById(id).populate("comments").exec(function(err, foundCampground) {
            if (err) {
                console.log("error with id " + err);
            }
            else {
                console.log(foundCampground);
                res.render("campgrounds/show", {campground: foundCampground});
            }
        }
    );
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;