const Post = require('../../models/post');
const mongoose = require('mongoose');

var addPost = (req,res)=>{
  const post = new Post({
    ownerID : req.user._id,
    ownername : req.user.local.username||req.user.facebook.username,
    imgpath : req.file? req.file.path:null,
    story : req.body.story,
    likes : 0,
    comments : 0,
    date : Date.now(),
  });
  post.save().then(result => {
      res.redirect('/home');
  })
  .catch(err=>{
    return res.status(400).json(err.message);
  });

};

module.exports = addPost;