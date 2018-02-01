var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");
var middleware = require("../middleware");

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

router.post("/", middleware.isLoggedIn, function(req, res) {
    //res.send("You hit the post route");
    // get data from form and add to campground array
    // redirect to campgrounds 
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    //campgrounds.push(newcamp);
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newcamp = {name: name, image: image, description: description, author: author};


    Campground.create(newcamp, function(err, newCamp) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("CREATED campground " + newCamp);
            res.redirect("/campgrounds")
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
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

// EDIT campground route

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE campground route

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // find and update campground
    //var data = {};
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + updatedCampground._id);
        }
    })
    //redirect
})

// DESTROY campground route

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    //res.send("YOu are trying to delete something");
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log("DELETE ERROR: " + err);
        }
        res.redirect("/campgrounds");
    });
});

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// }

// function checkCampgroundOwnership(req, res, next) {
//     if (req.isAuthenticated()) {
//         Campground.findById(req.params.id, function(err, foundCampground) {
//             if(err) {
//                 res.redirect("back");
//             }
//             else  {
//                 if (foundCampground.author.id === null) {
//                     res.redirect("back");
//                 }
//                 if (foundCampground.author.id.equals(req.user._id)) {
//                     next();
//                 } else {
//                     console.log("+++++YOU DIDNT MATCH USERS");
//                     res.redirect("back");
//                 }
//             }
//         });
//     } else {
//         res.redirect("back");
//     }
// }


module.exports = router;