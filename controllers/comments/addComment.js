const Comment = require('../../models/comment');
const Post = require('../../models/post');
const mongoose = require('mongoose');

var addComment = (req,res)=>{
  console.log(req);
  const comment = new Comment({
    postid : req.params.postid,
    userID : req.user._id,
    username : req.user.local.username||req.user.facebook.username,
    text : req.body.commentText,
    date : Date.now(),
  });
  comment.save().then(result => {
    res.redirect('/home');
  })
  .catch(err=>{
    return res.status(400).json(err.message);
  });
};

module.exports = addComment;