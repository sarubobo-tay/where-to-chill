const User = require('../models/user');

module.exports.registerForm = (req,res)=>{
    res.render('users/register');
};

module.exports.submitRegisterForm = async(req,res)=>{
    try{
    const {email,username,password} = req.body;
    const user = new User({email,username});
    const registeredUser = await User.register(user,password);
    req.login(registeredUser,err=>{
        if(err) return next(err)
    });
    req.flash('success','welcome to my site');
    res.redirect('/bars');
} catch(e){
    req.flash('error',e.message);
    res.redirect('/register');
} 
};

module.exports.loginForm = (req,res)=>{
    res.render('users/login');
};

module.exports.submitLoginForm = (req,res)=>{
    req.flash('success', 'you are logged in!');
    const redirectUrl = req.session.returnTo || 'bars';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.submitLogoutForm = (req,res)=>{
    req.logout();
    req.flash('success',"Goodbye! you have logged out");
    return res.redirect('/bars');
}