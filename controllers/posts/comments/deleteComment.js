
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
const Reply = require('../../../models/reply');

var deleteComment = (req, res, next) => {
  let comment;
  Comment.findOneAndDelete({ _id: req.params.commentid, _user: req.user._id })
  .then(result => {
    comment = result;
    if(!comment._id){
      return res.status(500).json({msg:"you are not the author of comment"});
    }
    return Reply.deleteMany({_id:{$in:comment.replies} });
  })
  .then(result => {
    return Post.updateOne({ _id: comment._post}, {
      $pull: { comments: comment._id }
    });
  })
  .then(result=>{
    return res.status(200).json({
      msg: "reply deleted",
      res: JSON.stringify(result),
      });
  })
  .catch(err => {
      // console.log(err);
    return res.status(404).json({ msg: "comment not found" });
  });
}

module.exports = deleteComment;