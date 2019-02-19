const Post = require('../../../models/post');

var getLikes = (req,res,next)=>{
  // console.log(`req to get all like on${req.params.postid}` );
  Post.findById(req.params.postid).populate({
    path:'likes',
    model:'User',
    slect:'username'
  }).exec()
  .then(post=>{
    return res.status(200).render('like',{likes:post.likes});
  })
  .catch(err=>{
    // console.log(err);
    return res.status(404).json({msg:"likes can not retrived error"});
  });
}

module.exports = getLikes;