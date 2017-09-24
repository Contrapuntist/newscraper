var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var Saved = new Schema ({
    
    title: { 
        type: String,
        trim: true,
        required: true
    }, 

    byline: { 
        type: String,
        trim: true
    },

    link: { 
        type: String,
        trim: true,
        required: true,
    }, 

    summary: { 
        type: String,
        trim: true,
        required: true
    }, 

});

var Saved = mongoose.model("Saved", Saved);

module.exports = Saved;