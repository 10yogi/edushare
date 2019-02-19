const Post = require('../../models/post');


var updatePost = (req,res,next)=>{
    Post.updateOne({
      _id: req.params.postid,
      _user: req.user._id
    }, {
        $set: { story: req.body.editText, date: Date.now() }
      }).then(result => {
       return res.status(200).json({
          message: "post story updated",
          comment: JSON.stringify(result)
        });
      })
      .catch(err => {
        return res.status(400).json(err.message);
      });
  };

module.exports = updatePost;