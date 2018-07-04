var mongoose = require("mongoose");

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// Send out the model
module.exports = mongoose.model("Post", postSchema);