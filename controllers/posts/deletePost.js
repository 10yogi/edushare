
const Post = require('../../models/post');
const Comment = require('../../models/comment');
const Like = require('../../models/like');

const fs = require('fs');

var deletePost = (req,res,next)=>{
  const id = req.params.postid;
  Post.findOne({
    _id:id,
    ownerID:req.user._id,
  }).exec()
  .then(post=>{
    fs.unlink(post.imgpath,()=>Post.deleteOne({_id:id})
      .exec()
      .then(result=>{
        return Comment.deleteMany({
          postid:post._id
        })
      })
      .then(result=>{
        return Like.deleteMany({
          postid:post._id
        })
      })
      .then(result=>{
        return res.status(200).json({message:"post deleted"});
      })
      .catch(err=>{
        console.log(err);
        return res.status(400).json(err)
      }));
  })
  .catch(err=>{
    console.log(err);
    return res.status(404).json({msg:"post not found"});
  });
}

module.exports = deletePost;