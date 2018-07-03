var express = require("express"), app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req,res) {
    res.render("home");
});

app.get("/fallinlovewith/:thing/", function(req,res) {
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req,res) {
   var posts = [
       { title: "The Potato Conspiracy", author: "Potatonator Jr." } ,
       { title: "Web Dev Bootcamp", author: "Jim Fisher" } ,
       { title: "Meow Meow Snacks", author: "Myu" }
       ];
    res.render("posts", {posts:posts});
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
})