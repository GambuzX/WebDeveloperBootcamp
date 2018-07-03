var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req,res){
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req,res){
    res.send("Goodbye!");
});

// "/dog" => "MEOW!"
app.get("/dog", function(req,res){
    res.send("MEOW!");
});

// SUBRREDITS 
app.get("/r/:subReddit", function(req,res) {
    var subreddit = req.params.subReddit;
    res.send("Welcome to the " + subreddit.toUpperCase() + " subReddit!");
})

app.get("/r/:subReddit/comments/:id/:title/", function(req, res) {
    res.send("Welcome to a subsubsubReddit!");
})

// Catch-all route
app.get("*", function(req,res) {
    res.send("ERROR 404 - PAGE NOT FOUND");
});

//Tell Express to listen for requests (start server)

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
});