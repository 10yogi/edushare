
const Comment = require('../../models/comment');

var getComments = (req,res,next)=>{
  const id = req.params.postid;
  Comment.find({
    postid:id,
  }).exec()
  .then(result=>{
    return res.status(200).render('comments',{comments:result,userID:req.user._id});
  })
  .catch(err=>{
    console.log(err);
    return res.status(404).json({msg:"comments can not retrived error"});
  });
}

module.exports = getComments;