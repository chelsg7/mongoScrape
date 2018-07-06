var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");

var db = require("./models");
var PORT = process.env.PORT || 8080;
var app = express();


app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

require("./routes/app.js")(app);

app.get('/', function(req, res) {
  res.render('index');
});
app.get('/comment/', function(req, res) {
  res.render('index');
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
