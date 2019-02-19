
const Comment = require('../../../models/comment');

const updateComment = (req,res)=>{
  Comment.updateOne({
    _id:req.params.commentid,
    _user:req.user._id
  },{
    $set:{text:req.body.editText, date:Date.now()}
  }).then(result=>{
    // console.log("comment update"+JSON.stringify(result));
    return res.status(200).json({
             message:"comment updated",
             comment: JSON.stringify(result)
     });
  })
  .catch(err=>{
    return res.status(400).json(err.message);
  });
};

module.exports = updateComment;


