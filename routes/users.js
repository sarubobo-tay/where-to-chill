const express = require('express');
const router = express.Router({mergeParams:true});
// const User = require('../models/user');
const catchAsync =require('../helpers/catchAsync');
const ExpressError =require('../helpers/ExpressError');
const passport = require('passport');
const users = require('../controllers/users');

router.route('/register')
    .get(users.registerForm)
    .post(catchAsync(users.submitRegisterForm))

router.route('/login')
    .get(users.loginForm)
    .post(passport.authenticate('local',{failureFlash:true, failureRedirect:'/login'}),users.submitLoginForm)

router.get('/logout',users.submitLogoutForm)

module.exports = router;