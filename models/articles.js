var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var formatNews = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  comments: [
    {
    type: Schema.Types.ObjectId,
    ref: "comments"
    }
  ]
});
var articles = mongoose.model("articles", formatNews);

module.exports = articles;
