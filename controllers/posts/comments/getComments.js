
const Post = require('../../../models/post');

var getComments = (req,res,next)=>{
  const id = req.params.postid;
  Post.findById(id).populate({
    path:'comments', 
    model:'Comment',
    populate:{
      path:'_user',
      model:'User',
      select:'username'
    },
  }).exec()
  .then(result=>{
    // console.log(result);
    return res.status(200).render('comments',{post:result,user:req.user});
  })
  .catch(err=>{
    // console.log(err);
    return res.status(404).json({msg:"comments can not retrived error"});
  });
}

module.exports = getComments;