const Post = require('../../../models/post');
const User = require('../../../models/user');

var deleteLike = (req,res,next)=>{
  User.updateOne({ _id: req.user._id }, {
    $pull: { mylikes: req.params.postid }
  }).then(result=>{
    return Post.findOneAndUpdate({
                  _id: req.params.postid
                },
                {
                  $pull: { likes: req.user._id }
                },
                {
                  new:true
                }
              )
  }).then( result=>{
    // console.log("deleteresult:"+result);
    return res.status(200).json(result);
  })
  .catch(err=>{
    // console.log(err);
    return res.status(400).json(err)
  })
}

module.exports = deleteLike;