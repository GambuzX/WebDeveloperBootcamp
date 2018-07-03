var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//Adding a new cat to the DB

/*var george = new Cat({
    name: "Myu",
    age: 2,
    temperament: "Lazy"
});

george.save(function(error, cat) {
    if (error)
        console.log("Something went wrong!");
    else {
        console.log("Cat was sabed to the DB");
        console.log(cat);
    }
});*/

Cat.create({name: "PotatoCat", age: 99, temperament: "Strange"}, function(error, cat) {
    if (error) {
        console.log(error);
    } else { 
        console.log(cat);
}});

//Retrieve all cats from the DB and log each one

Cat.find({}, function(error, cats) {
   if (error) {
       console.log("There was an error");
       console.log(error);
   } else {
       console.log("Cats found: ");
       console.log(cats);
   }
});