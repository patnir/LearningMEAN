var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");

var middleware = {};

middleware.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please log in");
    res.redirect("/login");
}

middleware.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            }
            else  {
                if (foundCampground.author.id === null) {
                    req.flash("error", "Error with user account");
                    res.redirect("back");
                }
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    //console.log("+++++YOU DIDNT MATCH USERS");
                    req.flash("error", "You need to be logged in as : " + foundCampground.author.username);
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please log in");
        res.redirect("back");
    }
}

middleware.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            // console.log("++++Comment: " + foundComment.author);
            // console.log("++++User id: " + req.user._id);
            if(err) {
                req.flash("error", "Comment not found");
                res.redirect("back");
            }
            else  {
                if (foundComment.author.id === null) {
                    req.flash("error", "Error with user account");
                    res.redirect("back");
                } else {
                    if (foundComment.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        // console.log("+++++YOU DIDNT MATCH USERS");
                        req.flash("error", "You need to be logged in as : " + foundCampground.author.username);
                        res.redirect("back");
                    }
                }
            }
        });
    } else {
        req.flash("error", "Please log in");
        res.redirect("back");
    }
}

module.exports = middleware;
