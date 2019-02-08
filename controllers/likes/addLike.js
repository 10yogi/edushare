const Like = require('../../models/like');
const Post = require('../../models/post');
const mongoose = require('mongoose');

var addLike = (req,res)=>{
  Like.findOne({ 
    postid:req.params.postid,
    ownerID : req.user._id,  
    ownername : req.user.local.username||req.user.facebook.username,
  }).then(result=>{
    if(!result){
      const like = new Like({
        postid:req.params.postid,
        ownerID : req.user._id,  
        ownername : req.user.local.username||req.user.facebook.username,
        date : Date.now(),
      });
      return like.save()
    }
    else
    return res.status(404).json({error:"already liked"});
  }).then(result => {
    console.log(result);
    if(result)
    return res.status(200).json({message:"liked"});
  })    
  .catch(err=>{
    res.status(400).json(err.message);
  });
  
 
};

module.exports = addLike;