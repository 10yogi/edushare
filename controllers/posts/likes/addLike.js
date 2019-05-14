
const Post = require('../../../models/post');
const User = require('../../../models/user');
const mongoose = require('mongoose');


var addLike = (req,res)=>{
  User.updateOne({ _id: req.user._id }, {
    $addToSet: { mylikes: req.params.postid }
  })
  .then(result=>{
    return Post.findOneAndUpdate({ _id: req.params.postid }, {
      $addToSet: { likes: req.user._id }
    },{new:true})
  }).then(post=>{
    // console.log("result"+post);
    return res.status(200).json(post);
  })
  .catch(err=>{
    return res.status(400).json(err.message);
  });
};

module.exports = addLike;