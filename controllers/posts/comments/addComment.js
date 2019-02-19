const Comment = require('../../../models/comment');
const Post = require('../../../models/post');
const mongoose = require('mongoose');

var addComment = (req,res)=>{
  // console.log(req);
  let postid = mongoose.Types.ObjectId(req.params.postid);
  const comment = new Comment({
    _post : postid,
    _user : req.user._id,
    text : req.body.commentText,
    date : Date.now(),
  });
  comment.save().then(result => {
    return Post.updateOne({_id:postid},{$push :{
      comments: result._id,
    }}).exec()
  }).then(result=>{
    res.redirect('/home')
  })
  .catch(err=>{
    return res.status(400).json(err.message);
  });
};

module.exports = addComment;