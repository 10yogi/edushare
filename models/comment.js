var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema(
  {
    _post: { type:mongoose.Schema.Types.ObjectId,ref:'Post'},
    _user:{type:mongoose.Schema.Types.ObjectId,index:true,ref:'User'},
    text:{type:String,required:true},
    date: Date,     
    replies:[{type:mongoose.Schema.Types.ObjectId,ref:'Reply'}]
  }
);

module.exports = mongoose.model('Comment', commentSchema);
