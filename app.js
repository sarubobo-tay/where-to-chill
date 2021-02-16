//Dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const ExpressError =require('./helpers/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');

//Routes
const bars = require('./routes/bars');
const reviews = require('./routes/reviews');

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
    secret:'qwerty123',
    resave:false,
    saveUninitialized:true,
    cookie:{
        //a week
        httpOnly:true,
        expires: Date.now() + (1000*60*60*24*7),
        maxAge : 1000*60*60*24*7
    }
    // store: mongo
}
app.use(session(sessionConfig));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//tidy routes.
app.use('/bars',bars);
app.use('/bars/:id/review',reviews);

//homepage
app.get('/',(req,res)=>{
    res.render('home')
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