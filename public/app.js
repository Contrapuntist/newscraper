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

    var id;

    $('.newcomment').on('click', function(e) { 
        e.preventDefault();
        id = $(this).attr('savedArtId');
        console.log('articleID = '+ id);
        $('.noteModal').modal('show');
    }) 
    
    $('.addComment').on('click', function (e) { 
        e.preventDefault();
        var commentData = {};
        commentData.commentText = $('#commentCopy').val();
        commentData.articleID = id;
        console.log(commentData);
        $.post("/newcomment", commentData);
        $('.noteModal').modal('hide');
    }); 

});