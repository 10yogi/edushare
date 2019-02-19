const User = require('../../models/user');
const Post = require('../../models/post');
const Comment = require('../../models/comment');
const Reply = require('../../models/reply');
const fs = require('fs');

var deletePost = (req, res, next) => {
  let post;
  Post.findOneAndDelete({ _id: req.params.postid, _user: req.user._id })
  .then(result => {
    post = result;
    if(!result._id){
      return res.status(500).json({msg:"you are not author of post bad request"});
    };    
    fs.unlinkSync(post.imgpath);
    return Comment.deleteMany({ _id: { $in: post.comments } });
  })
  .then(result=>{
    return Reply.deleteMany({ _post:post._id});
  })
  .then(result=>{
    return User.updateOne({ _id: post._user }, {
      $pull: { mylikes: post._id, myposts: post._id },
    });
  })
  .then(result=>{
    return res.status(200).json({
      msg: "post deleted",
    });
  })
  .catch(err => {
      console.log(JSON.stringify(err));
      return res.status(404).json({ msg: "post not found" });
  });
}

module.exports = deletePost;