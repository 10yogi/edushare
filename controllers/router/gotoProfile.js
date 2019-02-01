
const Post = require('../../models/post');

var gotoProfile  = (req,res)=>{
  Post.find({ownerId:req.user._id}).exec()
  .then(data =>{
    res.status(200).render('profile',{title:"profile",data:data,user:req.user});
  })
  .catch(err=>{
    console.log(err);
    res.status(404).json({error:err});
  })
};

module.exports = gotoProfile;