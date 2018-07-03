var express =          require("express"),
    bodyParser =       require("body-parser"),
    mongoose =         require("mongoose"),
    methodOverride =   require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    app =              express();
    
// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema);

/*Blog.create({
    title: "Test Blog",
    image: "https://images.unsplash.com/photo-1530518830146-6dabd7685847?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a0256428e51760f3a930c650ea6b5be6&auto=format&fit=crop&w=1050&q=80",
    body: "Hello! This is a blog post."
});*/

// RESTFUL ROUTES

app.get("/", function(req,res) {
    res.redirect("/blogs");
})

//Index Route
app.get("/blogs", function(req,res) {
    Blog.find({}, function(err, posts) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {posts: posts});
        }
    });
});

//New Route
app.get("/blogs/new", function(req,res) {
    res.render("new");
});

//Create Route
app.post("/blogs", function(req,res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(error, newBlog) {
        if (error) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

//Show Route
app.get("/blogs/:id", function(req,res) {
     Blog.findById(req.params.id, function(err, post) {
         if (err) {
             res.redirect("/blogs");
         } else {
             res.render("show", {post: post});
         }
     });
});

//Edit Route
app.get("/blogs/:id/edit", function(req,res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

//Update Route
app.put("/blogs/:id", function(req,res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
});

//Delete Route
app.delete("/blogs/:id", function(req,res) {
    Blog.findByIdAndRemove(req.params.id, function(error) {
        if (error) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
})