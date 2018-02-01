var express = require("express");
var router = express.Router();
var passport = require("passport");
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");


router.get("/", function(req, res) {
    res.render("landing");
});

// AUTH Routes

router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    console.log(newUser);
    User.register(
        newUser, req.body.password, function(err, user) {
            if(err) {
                console.log(err.message);
                //req.flash("error", err.message);
                res.render("register", {error: err.message});
            } else {
                passport.authenticate("local")(req, res, function() {
                    req.flash("success", "Welcome to YelpCamp " + user.username);
                    res.redirect("/campgrounds");
                });
            }
        }
    );
})

router.get("/login", function(req, res) {
    res.render("login");
})

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), function(req, res) {
    //res.send("LOGIN WORKS");
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/login");
});

router.get("*", function(req, res) {
    req.flash("error", "Not found!");
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;