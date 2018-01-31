var express     = require("express");
var app         = express();
var bodyparser  = require("body-parser");
var mongoose    = require("mongoose");
var passport    = require("passport");
var localStrategy = require("passport-local");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
var User        = require("./models/user")
var seedDB      = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_3");

app.use(bodyparser.urlencoded({extended: true}));
//app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

seedDB();

// Passport config

app.use(require("express-session") ({
    secret: "sausage", 
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
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

app.post("/campgrounds", isLoggedIn, function(req, res) {
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

app.get("/campgrounds/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res) {
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

// ==============
// COMMENT ROUTES
// ==============

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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
                    console.log(campground);
                    console.log(campground.comments);

                    console.log(comment);
                    campground.comments.push(comment._id);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});


// AUTH Routes

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    console.log(newUser);
    User.register(
        newUser, req.body.password, function(err, user) {
            if(err) {
                console.log("err");
                return res.render("register");
            }
            passport.authenticate("local")(req, res, function() {
                res.redirect("/campgrounds");
            });
        }
    );
})

app.get("/login", function(req, res) {
    res.render("login");
})

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), function(req, res) {
    //res.send("LOGIN WORKS");
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login");
});


app.get("*", function(req, res) {
    res.redirect("/");
});

app.listen(3000, function(req, res) {
    console.log("Started YelpCamp V1 Server");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


// Campground.findById(id, function(err, foundCampground) {
//     if (err) {
//         console.log("error with id " + err);
//     }
//     else {
//         res.render("show", {campground: foundCampground});
//     }
// });

// var campgroundsToInitialize = [
//     {name: "CG1", image: "https://images.unsplash.com/photo-1439946612398-57d8d0ac915d?ixlib=rb-0.3.5&s=4005af16c32eb614cb5537b43b45cd7b&auto=format&fit=crop&w=1050&q=80", 
//         description: "Camp Ground 1 is Beautiful"},
//     {name: "CG2", image: "https://images.unsplash.com/photo-1486692957922-ea51ea8472bc?auto=format&fit=crop&w=1073&q=80", 
//         description: "Campground 2 is beautiful"}, 
//     {name: "CG3", image: "https://images.unsplash.com/photo-1504519733529-35b35d10eee2?auto=format&fit=crop&w=1051&q=80", 
//         description: "campground 3 is beautiful"}, 
//     {name: "CG4", image: "https://images.unsplash.com/photo-1459292414836-763d35c7ae4c?ixlib=rb-0.3.5&s=bd02951bae92abbc4f5aad65b08f0a74&auto=format&fit=crop&w=1050&q=80", 
//         description: "campground 4 is beautiful"}
// ]

// Schema setu

// function createMultipleCampgrounds(array) {
//     Campground.create(array, function(err, campground) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("CREATED CG1");
//             console.log(campground);
//         }
//     });
// }

// createMultipleCampgrounds(campgroundsToInitialize);

// Campground.create({
//     name: "CG2", 
//     image: "https://images.unsplash.com/photo-1486692957922-ea51ea8472bc?auto=format&fit=crop&w=1073&q=80"
// }, function(err, campground) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("CREATED CG1");
//         console.log(campground);
//     }
// });
