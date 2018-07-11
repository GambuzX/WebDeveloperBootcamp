var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/", function(req,res) {
    //Get all campgrounds from DB
    Campground.find({}, function(error, allCampgrounds) {
        if (error) {
            console.log(error);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user})
        }
    })
})

//NEW - show form to create  new campground
router.get("/new", isLoggedIn, function(req,res) {
   res.render("campgrounds/new"); 
});

//CREATE - creates new campgrounds to DB
router.post("/", isLoggedIn,  function(req,res) {
   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   Campground.create({name: name, image: image, description: desc, author: author}, function(error, newlyCreated) {
       if (error){
           console.log(error);
       } else {
            res.redirect("/campgrounds");
       }
   });
});

//SHOW - shows more info about one campground
router.get("/:id", function(req,res) {
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
        if (error) {
            console.log(error);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
});

//EDIT 
router.get("/:id/edit", checkCampgroundOwnership, function(req,res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE
router.put("/:id", checkCampgroundOwnership, function(req,res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//DESTROY
router.delete("/:id", checkCampgroundOwnership, function(req,res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


//middleware
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req,res,next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        res.redirect("back");
    }
}

module.exports = router;