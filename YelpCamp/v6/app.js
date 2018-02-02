var express         = require("express");
var app             = express();
var bodyparser      = require("body-parser");
var mongoose        = require("mongoose");
var flash           = require("connect-flash");
var passport        = require("passport");
var localStrategy   = require("passport-local");
var methodOverride  = require("method-override");
var Campground      = require("./models/campground");
var Comment         = require("./models/comment");
var User            = require("./models/user")
var seedDB          = require("./seeds");

const PORT = process.env.PORT || 3000

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_5");

app.use(bodyparser.urlencoded({extended: true}));
//app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
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
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);   
app.use("/", indexRoutes);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

// app.listen(3000, function(req, res) {
//     console.log("Started YelpCamp V1 Server");
// });


