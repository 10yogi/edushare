const passport = require('passport');
const keys = require('./keys');
const User = require('../models/user')
var localStrategy = require('./strategies/local'); 
var facebookStrategy = require('./strategies/facebook-oauth');


passport.serializeUser((user,done)=>{
  done(null,user._id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then(user =>{
  
    done(null,user);   
  });  
});

passport.use('facebook',facebookStrategy(User,keys));

passport.use('local-signup',localStrategy.signup(User));
passport.use('local-login',localStrategy.login(User));

module.exports = passport;