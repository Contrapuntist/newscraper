/* Showing Mongoose's "Populated" Method
 * =============================================== */

// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");


var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var PORT = process.env.PORT || 3000;

// Requiring our Note and Article models
var Article = require("./models/Article.js");

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

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

app.get('/', function (req, res) {
    res.render('index');
});

app.get("/scrape", function(req, res) {
    console.log('in scrape call');
    // First, we grab the body of the html with request
    request("https://theconversation.com/us", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    console.log('in cheerio call');
    var $ = cheerio.load(html);
    // console.log(html);
        // Defining content to scrape from site
        $("div.page-column article header").each(function(i, element) {
        console.log('in section fetching');
            // Save an empty result object
            var result = {};
    
            // Add the text and href of every link, and save them as properties of the result object
            // result.section = $(this).html();
            result.title = $(this).first('h2 a').text();
            result.link = $(this).filter('h2 a').attr("href");
            // result.summary = $(this).children('p').text();
            
            console.log('***********************          Results Entry       *****************************************************');
            console.log(result);

            // Using our Article model, create a new entry
            // This effectively passes the result object to the entry (and the title and link)
            // var entry = new Article(result);

            // Now, save that entry to the db
            // entry.save(function(err, doc) {
            //     // Log any errors
            //     if (err) {
            //         console.log(err);
            //     }
            //     // Or log the doc
            //     else {
            //         console.log(doc);
            //     }
            // }); 
        });
    });
    // Tell the browser that we finished scraping the text
    res.send("Scrape Complete");
});


// // Routing 
// var scraperoutes = require("./routes/scrapecontroller.js");
// app.use('/scrape', scraperoutes);


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

app.listen(PORT, function() {
    console.log("Listening on port: ", PORT);
  });