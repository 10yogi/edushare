const express = require('express');
const router = express.Router();

const passport = require('../config/passport-config');
const routerController = require('../controllers/router/');

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
   if(req.isAuthenticated()){
     return res.redirect('/home');
   }
   res.render('index');
});


router.get('/signup',(req,res)=>{
   res.render('signup',{message: req.flash('signupMessage')});
}); 

router.post('/signup',passport.authenticate('local-signup',{
   successRedirect:'/home',
   failureRedirect:'/signup',
   failureFlash:true
}));


router.get('/login',(req,res)=>{
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


router.get('/home',isLoggedIn,nocache,routerController.gotoHome);
router.get('/profile',isLoggedIn,nocache,routerController.gotoProfile);


router.use('/oauth',require('./oauth'));
router.use('/posts',isLoggedIn,nocache,require('./posts'));

router.all('*',(req,res)=>{
   res.status(404).send({msg:'not found'});
});

module.exports = router;