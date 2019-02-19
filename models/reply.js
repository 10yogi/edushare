var mongoose = require('mongoose');

var replySchema = new mongoose.Schema({
  _post: { type: mongoose.Schema.Types.ObjectId,index:true,ref: 'Post' },
  _comment: { type: mongoose.Schema.Types.ObjectId,ref: 'Comment' },
  _user: { type: mongoose.Schema.Types.ObjectId,index:true, ref: 'User' },
  text: { type: String, required: true },
  date: Date,
})

module.exports = mongoose.model('Reply', replySchema);
 
