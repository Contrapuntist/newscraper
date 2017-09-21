var assert = chai.assert;
var expect = require("chai").expect; 
var Article = require('../models/Article.js');
var scraperoute = require('../routes/scrapecontroller.js'); 
var handlebarsviews = require('../views/layouts/main.handlebars');

// TEST: Check handlebars renders properly 
describe('handlebars', function() { 
    it('Should render page from handlebars main layout', function() { 

    });
})

// TEST: MongoDB is populating data properly  
describe('MongoDB Article Model', function() { 
    it('Should pass when adding new document to Article\'s collection in MongoDB', function() { 
        var testarticle = {} 
        expect(testarticle).to.be.empty;
    });
});

// TEST: Click events are triggering properly  

