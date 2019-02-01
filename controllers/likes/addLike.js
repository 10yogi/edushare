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
      like.save().then(result => {
        console.log(result);
        if(result)
        res.status(200).json({message:"liked"});
      })    
    }
    else
     return res.status(400).json({message:"already"});
  })
  .catch(err=>{
    res.status(400).json(err.message);
  });
  
 
};

module.exports = addLike;