
const Like = require('../../models/like');
const Post = require('../../models/post');
const fs = require('fs');

var deleteComment = (req,res,next)=>{
  const id = req.params.postid;
  Like.findOne({
    postid:id,
    ownerID:req.user._id,
  }).exec()
  .then(like=>{
    Like.deleteOne(like)
    .exec()
    .then(result=>{
      Post.updateOne({_id:id},{$set : {
        likes:this.likes-1
      }}).exec()
      .then(result=>{
        return res.status(200).json({message : 'unliked'});
      })
    })
    .catch(err=>{
      console.log(err);
      return res.status(400).json(err)
    });
  })
  .catch(err=>{
    console.log(err);
    return res.status(404).json({msg:"like not found"});
  });
}

module.exports = deleteComment;