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

//EDIT
router.get("/:comment_id/edit", checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {comment: foundComment, campground_id: req.params.id});
        }
    })
});

//UPDATE
router.put("/:comment_id", checkCommentOwnership, function(req,res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//DESTROY
router.delete("/:comment_id", checkCommentOwnership, function(req,res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
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

function checkCommentOwnership(req,res,next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("/login");
    }
}

module.exports = router;