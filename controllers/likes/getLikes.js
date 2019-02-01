const Like = require('../../models/like');
const fs = require('fs');

var getLikes = (req,res,next)=>{
  console.log('request reached');
  const id = req.params.postid;
  Like.find({
    postid:id
  }).exec()
  .then(likes=>{
    console.log(likes);
    return res.status(200).render('like',{likes:likes});
  })
  .catch(err=>{
    console.log(err);
    return res.status(404).json({msg:"likes can not retrived error"});
  });
}

module.exports = getLikes;