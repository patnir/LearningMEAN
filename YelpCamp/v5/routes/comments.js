var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");
var middleware = require("../middleware");

// comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// comments create
router.post("/", middleware.isLoggedIn, function(req, res) {
    //lookup campgrounds by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(campground);
                    // console.log(campground.comments);
                    // console.log(comment);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // add username and id to comments
                    comment.save();
                    // save comment

                    campground.comments.push(comment._id);
                    campground.save();
                    console.log("++++++++++++ " + comment);
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    var campgroundId = req.params.id;
    var commentId = req.params.comment_id;
    Comment.findById(commentId, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: campgroundId, comment: foundComment});
        }
    })
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    //res.send("you hit the update route");
    var commentId = req.params.comment_id;
    Comment.findByIdAndUpdate(commentId, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else  {
            res.redirect("/campgrounds/" + req.params.id);
        }
    }); 
});

// DELETE Comment

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// }

// function checkCommentOwnership(req, res, next) {
//     if (req.isAuthenticated()) {
//         Comment.findById(req.params.comment_id, function(err, foundComment) {
//             console.log("++++Comment: " + foundComment.author);
//             console.log("++++User id: " + req.user._id);
//             if(err) {
//                 res.redirect("back");
//             }
//             else  {
//                 if (foundComment.author.id === null) {
//                     res.redirect("back");
//                 } else {
//                     if (foundComment.author.id.equals(req.user._id)) {
//                         next();
//                     } else {
//                         console.log("+++++YOU DIDNT MATCH USERS");
//                         res.redirect("back");
//                     }
//                 }
//             }
//         });
//     } else {
//         res.redirect("back");
//     }
// }

module.exports = router;