const router = require('express').Router();

const passport = require('../config/passport-config');
const controller = require('../controllers/users')

//auth with facebook
router.get('/facebook',passport.authenticate('facebook',{
  scope : ['public_profile','email']
}));
router.get('/facebook/redirect',passport.authenticate('facebook',{
  failureRedirect:'/',
  successRedirect: '/home',
  failureFlash:true
}));


module.exports = router;