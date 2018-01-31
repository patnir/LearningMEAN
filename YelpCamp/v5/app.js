var express     = require("express");
var app         = express();
var bodyparser  = require("body-parser");
var mongoose    = require("mongoose");
var passport    = require("passport");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
var User        = require("./models/user")
var seedDB      = require("./seeds");

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_5");

app.use(bodyparser.urlencoded({extended: true}));
//app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//seedDB();

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


app.listen(3000, function(req, res) {
    console.log("Started YelpCamp V1 Server");
});


