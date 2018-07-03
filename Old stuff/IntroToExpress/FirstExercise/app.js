var express = require("express");
var app = express();

app.get("/", function(req,res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal/", function(req,res) {
    
    var sounds = {
        "pig": "Oink",
        "cow": "Moo",
        "dog": "Woff Woff",
        "cat": "I hate humans"
    }
   var animal = req.params.animal.toLowerCase();
   var sound = sounds[animal];
   res.send("The " + animal + " says '" + sound + "'");
});

app.get("/repeat/:word/:ntimes", function(req,res) {
   var word = req.params.word;
   var nTimes = Number(req.params.ntimes);
   word += ' ';
   
   var sentence = "";
   for (var i = 0; i < nTimes; i++) sentence+= word;
   res.send(sentence);
});

app.get("*", function(req,res) {
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
} )