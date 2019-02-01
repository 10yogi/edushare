
const Like = require('../../models/like');
const Post = require('../../models/post');
const fs = require('fs');

var deleteLike = (req,res,next)=>{
  const id = req.params.postid;
  Like.findOne({
      postid:id,
      ownerID:req.user._id,
  }).exec()
  .then(like=>{
     if(like)
      Like.deleteOne(like).exec()
      .then(result=>{
        res.status(200).json({message:'unliked'});
      })
  })
  .catch(err=>{
    console.log(err);
    return res.status(400).json(err)
  })
}

module.exports = deleteLike;