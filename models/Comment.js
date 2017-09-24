// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var CommentSchema = new Schema({
  
  // Just a string
  comment: {
    type: String, 
    validate: [
      function(input) {
        return input.length >= 10;
      },
      "Comment not long enough."
    ]
  },
  articleId: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },


});



// Create the Note model with the NoteSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Note model
module.exports = Comment;
