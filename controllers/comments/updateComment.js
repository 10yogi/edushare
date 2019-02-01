const Like = require('../../models/like');
const Post = require('../../models/post');
const mongoose = require('mongoose');

var addLike = (req,res)=>{
  const like = new Like({
    ownerID : req.user._id,
    ownername : req.user.local.username||req.user.facebook.username,
    date : Date.now(),
  });
  like.save().then(result => {
    Post.updateOne({_id:id},{$set : {
      likes:this.likes+1
    }}).exec()
    .then(result=>{
      return res.status(200).json({message : 'liked'});
    })
  })
  .catch(err=>{
    return res.status(400).json(err.message);
  });
};

module.exports = addLike;