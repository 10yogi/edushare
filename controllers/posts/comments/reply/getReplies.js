
const Post = require('../../../../models/post');
const Comment = require('../../../../models/comment');

var getReplies = (req, res, next) => {
  const pid = req.params.postid;
  const cid = req.params.commentid;
  Comment.findById(cid).populate({
      path: 'replies',
      model: 'Reply',
      populate:{
        path: '_user',
        model:'User',
        select:'username'
      }
  }).exec()
  .then(result => {
    // console.log(result);
    return res.status(200).render('reply', { comment: result, userID: req.user._id });
  })
  .catch(err => {
    // console.log(err);
    return res.status(404).json({ msg: "comments can not retrived error" });
  });
}

module.exports = getReplies;