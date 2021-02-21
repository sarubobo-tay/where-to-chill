if(process.env.NODE_ENV !=="production"){
    require('dotenv').config();
}

//Dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const ExpressError =require('./helpers/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');


//Routes
const barsRoutes = require('./routes/bars');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');

//Connect to db
mongoose.connect('mongodb://localhost:27017/where-chill', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true
     })
.then(() => {
    console.log("Mongo Connection Open")
})
.catch((e) => {
    console.log("Mongo Error")
    console.log(e)
})

//init express
const app = express();
//set ejs and view path
app.engine('ejs',engine);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
//app middlewares
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));


const sessionConfig ={
    name :"session",
    secret:'qwerty123',
    resave:false,
    saveUninitialized:true,
    cookie:{
        //a week
        httpOnly:true,
        secure:true,
        expires: Date.now() + (1000*60*60*24*7),
        maxAge : 1000*60*60*24*7
    }
    // store: mongo
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.get 

//tidy routes.
app.use('/bars',barsRoutes);
app.use('/bars/:id/review',reviewRoutes);
app.use('/',userRoutes);

//homepage
app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/about',(req,res)=>{
    res.render('about')
})


//404 route
app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not Found',404))
})

//error handler (this is the next.)
app.use((err,req,res,next)=>{
    const {statusCode = 500, message = 'Something went wrong'} = err;
    res.status(statusCode).render('partials/error',{statusCode,message})
})

app.listen(8080, ()=>{
    console.log('Running on Port 8080')
})