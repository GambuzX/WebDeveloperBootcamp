var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    passport     = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground   = require("./models/campground"),
    Comment      = require("./models/comment"),
    User         = require("./models/user"),
    seedDB       = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Potatoes are awesome",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next) {
   res.locals.currentUser = req.user;
   next();
});

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
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user})
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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req,res) {
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

// ================
//   AUTH ROUTES
// ================

//show register form
app.get("/register", function(req,res) {
    res.render("register");
});

//handle signup logic
app.post("/register", function(req,res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function() {
            res.redirect("/campgrounds");
        });
    });
});

//show login form
app.get("/login", function(req,res) {
    res.render("login");
});
//handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req,res) {
});

//logout
app.get("/logout", function(req,res){
   req.logout();
   res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp Camp server as started!");
});