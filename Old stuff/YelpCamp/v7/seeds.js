var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam ex, malesuada eu diam scelerisque, faucibus egestas felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac luctus mauris, vitae consectetur massa. Sed molestie mollis nulla ut ultrices. In suscipit porttitor lobortis. Fusce mollis gravida accumsan. Sed interdum dapibus risus sed iaculis. Nullam facilisis odio at nibh malesuada facilisis. Cras tempus elementum pharetra. Morbi cursus placerat dui non ultricies. Sed maximus lorem id dui pulvinar semper. Proin ac nisi vitae lectus molestie rutrum vitae vel lacus. Donec auctor varius rutrum. Nulla consequat mi quis libero suscipit, nec tempus purus luctus."
    },
    {
        name: "Desert Meza",
        image: "https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ba3fa37b995a705a01d022cada13f726&auto=format&fit=crop&w=500&q=60",
        description: "Ut molestie lacus urna, ut efficitur turpis convallis nec. Sed at enim at massa ultricies rutrum nec nec eros. Aenean blandit dolor vel quam dictum venenatis. Nullam ex orci, aliquam vitae tristique nec, faucibus ornare arcu. Praesent non magna lobortis, condimentum odio vitae, consequat libero. Aenean congue justo pretium condimentum dapibus. Quisque id leo feugiat, laoreet est eu, laoreet nulla. Sed fringilla augue mauris, ut porttitor sapien ultrices in. Curabitur tincidunt justo magna, ut pharetra arcu iaculis a. Cras in sodales metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus suscipit posuere dolor, eget commodo mi."
    },
    {
        name: "Canyon Floor",
        image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d95171e276fbd03de651f9aecb64b53d&auto=format&fit=crop&w=500&q=60",
        description: "Praesent ut dictum est. Nam felis lacus, vehicula iaculis dui at, commodo euismod dolor. In elementum, orci a suscipit luctus, lorem nisi mollis quam, sed porttitor ipsum quam at nunc. Nunc vel nunc est. Nullam eu turpis metus. Mauris tincidunt ligula et dui egestas facilisis. Integer sit amet felis vitae felis lacinia rutrum. Vestibulum scelerisque, leo nec malesuada sodales, ligula ligula hendrerit odio, id sollicitudin mi tellus et ante. Duis non lacus sollicitudin, luctus est ac, viverra velit. Integer elementum, lectus vel malesuada euismod, dui ex pellentesque dui, mollis porta velit dui ut lacus. Donec leo leo, tincidunt et ultrices in, laoreet at augue. Aenean a lorem ac enim accumsan egestas."
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