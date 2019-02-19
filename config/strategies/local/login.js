const LocalStrategy = require('passport-local').Strategy;

var login =   (User)=>{
  return new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  (req,email,password,done)=>{
    User.findOne({'username':email},(err,user)=>{
      if(err) return done(err);
      if(!user)
        return done(null,false,req.flash('loginMessage','No user found'));
      if(!user.validPassword(password,user.local.password))
        return done(null,false,req.flash('loginMessage','Oops! Wrong password'));
      return done(null,user);
    });
  })
};

module.exports = login;