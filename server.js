/* Showing Mongoose's "Populated" Method
 * =============================================== */

// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");


var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var PORT = process.env.PORT || 3000;


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
var databaseUri = 'mongodb://localhost/scrapingapp';
if (process.env.MONGODB_URI) { 
  var promise = mongoose.connect(process.env.MONGODB_URI)
} else {
  var promise = mongoose.connect(databaseUri, {
    useMongoClient: true,
    /* other options */
  });
}
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