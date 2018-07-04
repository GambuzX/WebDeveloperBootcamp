var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2");

var Post = require("./models/post.js");
var User = require("./models/user.js");

/*User.create({
    email: "bob@gmail.com",
    name: "Bob Belcher"
});*/

/*Post.create({
    title: "How to cook the best potato pt. 3",
    content: "The secret is to treat it nicely and ..."
}, function(err,post) {
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            })
        }
    });
});*/

//Find user
//Find all posts for that user

User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user) {
    if (err) {
        console.log(err);
    } else {
        console.log(user);
    }
})