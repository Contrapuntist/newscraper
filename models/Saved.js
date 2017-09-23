var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var Saved = new Schema ({
    
    title: { 
        type: Schema.Types.ObjectId,
        ref: "Article"
    },

    byline: { 
        type: Schema.Types.ObjectId,
        ref: "Article"
    },

    summary: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    },

    link: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }, 

});

var Saved = mongoose.model("Saved", Saved);

module.exports = Saved;