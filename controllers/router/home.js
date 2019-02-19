
const Post = require('../../models/post');

var home  = (req,res)=>{
  Post.find().populate('_user',['_id','username']).sort({date:-1}).exec()
  .then(data =>{ 
    return res.status(200).render('home',{title:"home",data:data,user:req.user});
  })
  .catch(err=>{
    // console.log(err);
    res.status(404).json({error:err});
  })

};

module.exports = home;