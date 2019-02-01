var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  ownerID : String,
  ownername: String,
  imgpath:{type:String,required:true},
  story : String,
  likes : Number,
  comments:Number,
  date: Date,
});

module.exports = mongoose.model('Post',postSchema);