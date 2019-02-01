var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema(
  {
    postid:{type:String,required :true},
    userID : {type:String,required:true},
    username: String,
    text:{type:String,required:true},
    date: Date,     
  }
);

module.exports = mongoose.model('Comment',commentSchema);