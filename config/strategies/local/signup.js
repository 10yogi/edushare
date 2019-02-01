const LocalStrategy = require('passport-local').Strategy;

var signup =  (User)=>{
  return new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  (req,email,password,done)=>{  
    //User.findOne wont fire unless data is sent back
    //process.nextTick(function(){
        User.findOne({'local.username':email},(err,user)=>{
          if(err){return done(err);}
          if(user){
            return done(null,false,req.flash('signupMessage','that email is already taken.'));
          }else{
            var newUser = new User();
            newUser.local.username = email;
            console.log(password);
            newUser.local.password = newUser.generateHash(password);     
            newUser.save(function(err){
              if(err)
                throw err;
              return done(null,newUser);
            });
          }
        });
    //})  
  }  
)
};

module.exports = signup;