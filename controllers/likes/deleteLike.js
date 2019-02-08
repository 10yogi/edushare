
const Like = require('../../models/like');
const Post = require('../../models/post');
const fs = require('fs');

var deleteLike = (req,res,next)=>{
  const id = req.params.postid;
  Like.deleteOne({
      postid:id,
      ownerID:req.user._id,
  })
  .then(result=>{
     console.log(result);
     if(result.deletedCount>=0)
      return res.status(200).json({message:'unliked'});
     else
      return res.status(400).joson({message:"already unliked"});
  })
  .catch(err=>{
    console.log(err);
    return res.status(400).json(err)
  })
}

module.exports = deleteLike;