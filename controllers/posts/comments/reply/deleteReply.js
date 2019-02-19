const Comment = require('../../../../models/comment');
const Reply = require('../../../../models/reply');

var deleteReply = (req, res, next) => {
  Comment.updateOne({ _id: req.params.commentid,_user:req.user._id }, {
    $pull: { replies: req.params.replyid }
  })
  .then(result => {
    return Reply.deleteOne({_id:req.params.replyid,_user:req.user._id})
  })
  .then(result=>{
    // console.log("deleteresult:" + JSON.stringify(result));
    return res.status(200).json(JSON.stringify(result));
  })
  .catch(err => {
    // console.log(err);
    return res.status(400).json(err)
  })
}

module.exports = deleteReply;