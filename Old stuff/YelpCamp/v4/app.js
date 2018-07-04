var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    Campground   = require("./models/campground"),
    Comment      = require("./models/comment"),
    seedDB       = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

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
            res.render("campgrounds/index", {campgrounds: allCampgrounds})
        }
    })
})

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req,res) {
   res.render("campgrounds/new"); 
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
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
        if (error) {
            console.log(error);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
});

// ================
// COMMENTS ROUTES
// ================

app.get("/campgrounds/:id/comments/new", function(req,res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req,res) {
   //lookup campground using ID
   Campground.findById(req.params.id, function(error, foundCampground) {
       if (error) {
           res.redirect("/campgrounds");
       } else {
           console.log(req.body);
           Comment.create(req.body.comment, function(err, newComment) {
               if (err) {
                   console.log(err);
               } else {
                   foundCampground.comments.push(newComment);
                   foundCampground.save();
                   res.redirect("/campgrounds/" + req.params.id);
               }
           })
       }
   })
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp Camp server as started!");
});