var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=500&q=60",
        description: "Blah blah blah."
    },
    {
        name: "Desert Meza",
        image: "https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ba3fa37b995a705a01d022cada13f726&auto=format&fit=crop&w=500&q=60",
        description: "Very nice."
    },
    {
        name: "Canyon Floor",
        image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d95171e276fbd03de651f9aecb64b53d&auto=format&fit=crop&w=500&q=60",
        description: "This should be a description."
    } 
];


function seedDB() {
    //remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
       console.log("Removed campgrounds!"); 
       
       //Add a few campgrounds
        data.forEach(function(camp) {
            Campground.create(camp, function(err, newCamp) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Campground added to DB");
                    //Create a comment
                    Comment.create({
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function(err, comment) {
                         if (err) {
                            console.log(err);
                        } else {
                            newCamp.comments.push(comment);
                            newCamp.save();
                            console.log("Created new comment");
                        }
                    });
                }
            })
        })
    });
};

module.exports = seedDB; 