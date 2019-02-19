var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  _user : {type:mongoose.Schema.Types.ObjectId,index:true,ref:'User'},
  imgpath:{type:String,required:true},
  story : String,
  date: Date,
  likes :[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
  comments:[{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}],
});

module.exports = mongoose.model('Post',postSchema);