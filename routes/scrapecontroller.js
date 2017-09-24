var express = require("express");
var router = express.Router();
var Article = require("../models/Article.js");
var Saved = require("../models/Saved.js");
var request = require('request');
var cheerio = require('cheerio');
var handlebars = require('express-handlebars');
var mongoose = require('mongoose');

console.log('in scrape controller module');


// Homepage route which renders handlebars index
router.get('/', function (req, res) {
    var articlesObj = {};
    Article.find({}).sort({dateCreated: 1}).limit(30).exec(function(err, articles) {
        if (err) { 
            console.log(err);
        } else { 
            articlesObj.articles = articles;
            // console.log(articlesObj.articles[0].title);
            res.render('index', articlesObj);
        }
    });
});

router.get('/savedarticles', function(req, res) { 
    var savedArticlesObj = {}; 
    Saved.find({}, function(err, savedarticles) { 
        
        savedArticlesObj.savedarticles = savedarticles; 
        
        if (err) { 
            console.log(err);
        } else { 
            console.log(savedArticlesObj.savedarticles)
            res.render('saved', savedArticlesObj);
        }
    });
});

router.get('/savearticle/:articleid', function(req, res) { 
    Article.findOne({"title": req.params.articleid}).exec(function(err, article) { 

        var articletosave = {};
        
        // Add the text and href of every link, and save them as properties of the result object
        articletosave.title = article.title;
        articletosave.byline = article.byline;
        articletosave.link = article.link;
        articletosave.summary = article.summary;
       
        var savedarticle = new Saved(articletosave);

            // Now, save that entry to the db
            savedarticle.save(function(err, doc) {
                // Log any errors
                if (err) {
                    console.log(err);
                }
                // Or log the doc
                else {
                    console.log(doc);
                }
            }); 

        console.log('*********  Ready to save article  *********  ');
        console.log(savedarticle);
    })
    res.redirect('/savedarticles');
});


router.get("/refresh", function(req, res) { 
    console.log('in refresh'); 
    emptyArticlesCollection(function() {
        res.redirect('/scrape');
    }); 
});

// Scraping route
router.get("/scrape", function(req, res) {
    console.log('in scrape call');

    cheerioscrape(function() { 
        res.redirect('/');
    });

});

// Route to update headlines in database
router.get('/update', function(req, res) { 
    res.redirect('/scrape');
});

// *******************************************************
// HELPER ROUTING FUNCTIONS; uSED TO IMPROVE SYNCHROUNOUS ISSUES 
// IN SOME ROUTES DEALING WITH DATABASE MANIPULATION
// *******************************************************

// function to empty collection 
function emptyArticlesCollection(cb) { 
    mongoose.connection.collections.articles.deleteMany();
    return cb();        
}

// function with cb; cb using to sync page refresh
function cheerioscrape(cb) { 
    request("https://theconversation.com/us", function(error, response, html) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        console.log('in cheerio call');
        if (error) {
            console.log(error);
        }
        var $ = cheerio.load(html);
        
        // Defining content to scrape from site
        $("div.page-column article").each(function(i, element) {
        console.log('in section fetching');
            // Save an empty result object
            var result = {};
    
            // Add the text and href of every link, and save them as properties of the result object
            // result.section = $(this).html();
            result.title = $(this).find('h2 a').text();
            result.byline = $(this).find('p span').text();
            result.link = 'https://theconversation.com' + $(this).find('h2 a').attr("href");
            result.summary = $('div.content').first().text();
            result.dateCreated = Date.now();

            console.log('***********************          Results Entry       *****************************************************');
            console.log(result);
            
            // Using our Article model, create a new entry
            // This effectively passes the result object to the entry (and the title and link)
            var entry = new Article(result);

            // Now, save that entry to the db
            entry.save(function(err, doc) {
                // Log any errors
                if (err) {
                    console.log(err);
                }
                // Or log the doc
                else {
                    console.log(doc);
                }
            }); 
        });
    });

    return cb();
}


module.exports = router;
