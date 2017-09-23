/* Showing Mongoose's "Populated" Method
 * =============================================== */

// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");


var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var PORT = process.env.PORT || 3000;

// // Requiring our Note and Article models
// var Article = require("./models/Article.js");

// // // Our scraping tools
// var request = require("request");
// var cheerio = require("cheerio");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

//Establishing handlebars 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration with mongoose
var promise = mongoose.connect('mongodb://localhost/scrapingapp', {
    useMongoClient: true,
    /* other options */
  });
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Routing 
var scraperoutes = require("./routes/scrapecontroller.js");
app.use('/', scraperoutes);
app.use('/scrape', scraperoutes);
app.use('/update', scraperoutes);

app.listen(PORT, function() {
    console.log("Listening on port: ", PORT);
  });