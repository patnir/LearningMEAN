var express = require("express");
var app = express();


const PORT = process.env.PORT || 5000


app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))