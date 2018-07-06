var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  title: String,

  body: String
});

var comments = mongoose.model("comments", CommentSchema);


module.exports = comments;