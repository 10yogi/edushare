
const User = require('../../models/user');

var gotoProfile  = (req,res)=>{

  User.findOne({_id:req.user._id}).populate({
    path:'myposts',
    model:'Post',
    populate:{
      path:'_user',
      model:'User',
      select:'username'
    }
  }).exec()
  .then(usr =>{
    // console.log(JSON.stringify(usr));
    res.status(200).render('profile',{title:"profile",data:usr['myposts'],user:req.user});
  })
  .catch(err=>{
    // console.log(err);
    res.status(404).json({error:err});
  })
};

module.exports = gotoProfile;