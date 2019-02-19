const Post = require('../../models/post');
const User = require('../../models/user');
const mongoose = require('mongoose');

var addPost = (req,res)=>{
  const post = new Post({
    _user: req.user._id,
    imgpath : req.file? req.file.path:null,
    story : req.body.story,
    likes:[],
    comments:[],
    date : Date.now(),
  });
  post.save().then(result => {
    // console.log("calling"+JSON.stringify(result));
    return User.updateOne({_id:mongoose.Types.ObjectId(req.user._id)},{
        $push :{ myposts : result._id},
      });
  }).then(result=>{
   return res.redirect('/home');
  })
  .catch(err=>{
    return res.status(400).json(err.message);
  });

};
module.exports = addPost;