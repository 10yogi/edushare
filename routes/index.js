const express = require('express');
const router = express.Router();

const passport = require('../config/passport-config');
const routesController = require('../controllers/router/');

function isLoggedIn (req,res,next){
   if(req.isAuthenticated())
      return next();
   res.redirect('/');
};

function nocache(req,res,next){
   res.header('Cache-Control','private, no-cache, no-store , must-revalidate');
   res.header('Expires','-1');
   res.header('Pragma','no-cache');
   next();
}

router.get('/',(req,res)=>{
   if(req.isAuthenticated())
     return res.redirect('/home');
   else
   res.render('index');
});


router.get('/signup',(req,res)=>{
   if(req.isAuthenticated())
      res.redirect('/home');
   else
      res.render('signup',{message: req.flash('signupMessage')});
}); 

router.post('/signup',passport.authenticate('local-signup',{
   successRedirect:'/home',
   failureRedirect:'/signup',
   failureFlash:true
}));


router.get('/login',(req,res)=>{
   if(req.isAuthenticated())
      res.redirect('/home');
   else
     res.render('login',{message : req.flash('loginMessage')});
});

router.post('/login',passport.authenticate('local-login',{
   successRedirect:'/home',
   failureRedirect: '/login',
   failureFlash: true
}));


router.get('/logout',(req,res)=>{
   req.logOut();
   res.redirect('/');
});


router.get('/home',isLoggedIn,nocache,routesController.home);
router.get('/profile',isLoggedIn,nocache,routesController.profile);


router.use('/oauth',require('./oauth'));
router.use('/posts',isLoggedIn,nocache,require('./posts'));

router.all('*',(req,res)=>{
   res.redirect('/')
});

module.exports = router;