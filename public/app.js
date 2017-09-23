$(document).ready(function () {
    
    $('#update').on('click', function(x) {
        x.preventDefault(); 
        console.log('update button click registered');
        
        $.get("/scrape", function (data) {
                document.location.reload();
            });
    });

    $('.savearticle').on('click', function(x) { 
        x.preventDefault(); 
        console.log('new article saved'); 
        var articleID = this.getAttribute("articleID"); 
        console.log(articleID);
        var url = "/savearticle/" + articleID;
        $.get(url);
    });

});