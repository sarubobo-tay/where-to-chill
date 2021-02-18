module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error','please log in to access this link!')
        return res.redirect('/login');
    }
    next();
}

