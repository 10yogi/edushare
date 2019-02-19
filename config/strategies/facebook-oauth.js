const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (User,keys){
  return new FacebookStrategy({
    callbackURL : keys.facebook.redirect,
    clientID:keys.facebook.appID,
    clientSecret:keys.facebook.secret
  },
  (acessToken,refreshToken,profile,done) => {
    // console.log(profile._json);
    //check is user already exist in database
    /*User.findOne({'facebook.facebookId':profile.id}).then((user)=>{
      if(user){
        //already have user
        // console.log('user is : ',user); 
        done(null,user);
      }else{
        //if not
        var newUser = User2();
        newUser.facebook.username = profile.displayName;
        newUser.facebook.facebookId = profile.id;
        newUser.facebook.thumbnail = profile._json.image.url;
        
        newUser.save()
        .then(res=>{
          // console.log(`new facebook login created : ${newUser}`);
          done(null,newUser);
        })
        .catch(err=>{
          done(err);
        });
      }
    });
    */
  })
} 