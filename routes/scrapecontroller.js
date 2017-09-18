

module.exports = function(app) { 
// A GET request to scrape the echojs website
    console.log('in scrape controller module');
    app.get("/scrape", function(req, res) {
        console.log('in scrape call');
        // First, we grab the body of the html with request
        request("https://theconversation.com/us", function(error, response, html) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        console.log('in cheerio call');
        var $ = cheerio.load(html);
        console.log(html);
        // Now, we grab every h2 within an article tag, and do the following:
            $("section.content").each(function(i, element) {
        
                // Save an empty result object
                var result = {};
        
                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");
                result.summary = $(this).children('p').text();
        
                // Using our Article model, create a new entry
                // This effectively passes the result object to the entry (and the title and link)
                var entry = new Article(result);
                console.log(entry);


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
        // Tell the browser that we finished scraping the text
        res.send("Scrape Complete");
    });

}
