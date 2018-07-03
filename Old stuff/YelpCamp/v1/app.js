var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f0c57aa7eab7b0_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f0c57aa7eab7b0_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f0c57aa7eab7b0_340.jpg"},
    {name: "Salmon Creek", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f0c57aa7eab7b0_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f0c57aa7eab7b0_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f0c57aa7eab7b0_340.jpg"}
    ];

app.get("/", function(req,res) {
    res.render("landing");
});

app.get("/campgrounds", function(req,res) {
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.get("/campgrounds/new", function(req,res) {
   res.render("new.ejs"); 
});

app.post("/campgrounds", function(req,res) {
   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   campgrounds.push({name: name, image: image});
   //redirect back to campgrounds page
   res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp Camp server as started!");
});