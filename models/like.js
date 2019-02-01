var mongoose = require('mongoose');

var likeSchema = new mongoose.Schema(
  {
    postid:{type:String,required :true},
    ownerID : {type:String,required:true},
    ownername: String,
    date: Date,     
  }
);

module.exports = mongoose.model('Like',likeSchema);