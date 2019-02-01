
const Post = require('../../models/post');
const Like = require('../../models/like');

var gotoHome  = (req,res)=>{

  Post.find().sort({date:-1}).exec()
  .then(data =>{
      Like.find({
        ownerID:req.user.id 
      })
      .exec()
      .then(result=>{
        let likedpost = {};
        result.forEach((like)=>{
          likedpost[like.postid] = true;
        })
        console.log(likedpost);
        return res.status(200).render('home',{title:"home",data:data,user:req.user,likedpost:likedpost});
      })
  })
  .catch(err=>{
    console.log(err);
    res.status(404).json({error:err});
  })

};

module.exports = gotoHome;