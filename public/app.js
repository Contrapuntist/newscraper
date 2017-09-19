$(document).ready(function () {
    $('#update').on('click', function(x) {
        x.preventDefault(); 
        console.log('update button click registered');
        
        $.get("/update", function (data) {
                console.log(data);
            });
    })
});