const express = require('express');
const router = express.Router({mergeParams:true});
const User = require('../models/user');
const catchAsync =require('../helpers/catchAsync');
const ExpressError =require('../helpers/ExpressError');
const passport = require('passport');




router.get('/register', (req,res)=>{
    res.render('users/register');
})

router.post('/register', catchAsync(async(req,res)=>{
    try{
    const {email,username,password} = req.body;
    const user = new User({email,username});
    const registeredUser = await User.register(user,password);
    req.flash('success','welcome to my site');
    res.redirect('/bars');
} catch(e){
    req.flash('error',e.message);
    res.redirect('/register');
} 
}))


router.get('/login', (req,res)=>{
    res.render('users/login');
})

router.post('/login',passport.authenticate('local',{failureFlash:true, failureRedirect:'/login'}), (req,res)=>{
    req.flash('success', 'you are logged in!');
    res.redirect('bars');
})

module.exports = router;