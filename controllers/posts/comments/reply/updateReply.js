
const Reply = require('../../../../models/reply');

const updateReply = (req, res) => {
  Reply.updateOne(
    {
    _id: req.params.replyid,
    _user: req.user._id
    },
    { 
      $set: { text: req.body.editText, date: Date.now()}
    }
  )
  .then(result => {
      // console.log("comment update" + JSON.stringify(result));
      return res.status(200).json({
        message: "comment updated",
        comment: JSON.stringify(result)
      });
    })
  .catch(err => {
    return res.status(400).json(err.message);
  });
};

module.exports = updateReply;