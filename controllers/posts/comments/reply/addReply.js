const Comment = require('../../../../models/comment');
const Reply = require('../../../../models/reply');

var addReply = (req, res) => {
  // console.log(req);
  const reply = new Reply({
    _post:req.params.postid,
    _comment: req.params.commentid,
    _user: req.user._id,
    text: req.body.replyText,
    date: Date.now(),
  });
  reply.save().then(result => {
    return Comment.update({ _id: req.params.commentid }, {
      $push: {
        replies: result._id,
      }
    })
  }).then(result => {
    res.send(JSON.stringify({"message":"reply done"}));
  })
    .catch(err => {
      return res.status(400).json(err.message);
    });
};

module.exports = addReply;