var express = require("express");
var app = express();


app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment");
});

app.get("/speak/:animalname", function(req, res) {
    var animal = req.params.animalname;
    var toSend = "";
    if (animal === "cow") {
        toSend = "The cow says, 'Moo'";
    }
    else if (animal === "dog") {
        toSend = "The dog says, 'Woof'";
    }
    else if (animal === "pig") {
        toSend = "The pig says, 'Oink'";
    }
    else {
        toSend = "we don't recognize that animal";
    }
    res.send(toSend);
});

app.get("/repeat/:phrase/:times", function(req, res) {
    var phrase = req.params.phrase;
    var times = req.params.times;
    var toSend = ""
    for (var i = 0; i < parseInt(times); i++) {
        toSend += phrase + " ";
    }
    res.send(toSend);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found");
});


app.listen(3000, function() {
    console.log("listening on port 3000");
})
