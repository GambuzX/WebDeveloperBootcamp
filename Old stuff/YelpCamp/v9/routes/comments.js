var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//Comments New
router.get("/new", isLoggedIn, function(req,res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

//Comments Create
router.post("/", isLoggedIn, function(req,res) {
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
                   //add username and id to comment
                   newComment.author.id = req.user._id;
                   newComment.author.username = req.user.username;
                   //save comment
                   newComment.save();
                   foundCampground.comments.push(newComment);
                   foundCampground.save();
                   res.redirect("/campgrounds/" + req.params.id);
               }
           })
       }
   })
});

//middleware
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;