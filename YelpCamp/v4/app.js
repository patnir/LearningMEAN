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

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_4");

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

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);   
app.use("/", indexRoutes);


// router.get("*", function(req, res) {
//     res.redirect("/");
// });

app.listen(3000, function(req, res) {
    console.log("Started YelpCamp V1 Server");
});


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