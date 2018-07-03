var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema SETUP

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create(
    {
        name: "Granite Hill",
        image: "https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f3e3ff1cce6d43ff22a50a83269f07ac&auto=format&fit=crop&w=1050&q=80",
        description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
    }, function (error, newlyCreated) {
        if (error) {
            console.log(error);
        } else {
            console.log(newlyCreated);
        }
    });*/

app.get("/", function(req,res) {
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req,res) {
    //Get all campgrounds from DB
    Campground.find({}, function(error, allCampgrounds) {
        if (error) {
            console.log(error);
        } else {
            res.render("index", {campgrounds: allCampgrounds})
        }
    })
})

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req,res) {
   res.render("new"); 
});

//CREATE - creates new campgrounds to DB
app.post("/campgrounds", function(req,res) {
   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   Campground.create({name: name, image: image, description: desc}, function(error, newlyCreated) {
       if (error){
           console.log(error);
       } else {
            res.redirect("/campgrounds");
       }
   });
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req,res) {
    var id = req.params.id;
    Campground.findById(id, function(error, campground) {
        if (error) {
            console.log(error);
        } else {
            res.render("show", {campground: campground});
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp Camp server as started!");
});