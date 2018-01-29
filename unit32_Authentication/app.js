var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var User = require("./models/user");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "RahulPatni", 
    resave: false,
     saveUninitialized: false
}));

// whenver we used session: 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//ROUTES

app.get("/", function(req, res) {
    res.render("home");
})

app.get("/secret", isLIN, function(req, res) {
    res.render("secret");
})

// auth ROUTES
// show sign up for
app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    //res.send("Register post route");
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render("register");
        }
        // here is where you use different strategies
        passport.authenticate("local")(req, res, function() {
            res.redirect("/secret");
    	});
    });
})

app.get("/login", function(req, res) {
	res.render("login");
})

app.post("/login", passport.authenticate("local", {
		successRedirect: "/secret", 
		failureRedirect: "/login"
	}), function(req, res) {
});

app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

function isLIN(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

app.listen(3000, function() {
    console.log("The app has started");
});