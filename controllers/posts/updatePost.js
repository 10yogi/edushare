const Post = require('../../models/post');


var updatePost = (req,res,next)=>{
  const id = req.params.userId;
  if(!id){
    return res.status(400).json({message:"id is required"});
  }
  if(!req.body.name){
    return res.status(400).json({message:"name is required"});
  }
  if(!req.body.age){
    return res.status(400).json({message:"age is required"});
  }
  Post.updateOne({_id:id},{$set : {
    story : req.body.story,
    age: req.body.age
  }})
  .then(result=>{
    res.status(200).json({
      message : 'post updated'
    });
  })
  .catch(err=>{
    res.status(400).json(err);
  })
};

module.exports = updatePost;