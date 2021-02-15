const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Schema = mongoose.Schema;
const Bars = require('./models/bars');
const engine = require('ejs-mate');
const catchAsync =require('./helpers/catchAsync');
const ExpressError =require('./helpers/ExpressError');
const Joi = require('joi');
const Review = require('./models/review');
const bars = require('./models/bars');
// const {barSchema, reviewSchema} = require('./schemas.js');


// var morgan = require('morgan');

mongoose.connect('mongodb://localhost:27017/where-chill', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Mongo Connection Open")
})
.catch((e) => {
    console.log("Mongo Error")
    console.log(e)
})

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs',engine);
// app.use(morgan('tiny'));

// const validateBars = (req,res,next) =>{
//     const {error} = barSchema.validate(req.body);
//     if(error){
//         const msg = error.details.map(el=>el.message).join(',')
//         throw new ExpressError(msg,400)
//     } else{
//         next();
//     }
// }

// const validateReview = (req,res,next) =>{
//     const {error} = reviewSchema.validate(req.body);
//     if(error){
//         const msg = error.details.map(el=>el.message).join(',')
//         throw new ExpressError(msg,400)
//     } else{
//         next();
//     }
// }


app.get('/',(req,res)=>{
    res.render('home')
})

//Create
app.get('/bars/new',(req,res)=>{
    res.render('bars/new')
})

app.post('/bars', catchAsync( async(req,res)=>{
    // if(!req.body.bars) throw new ExpressError('Invalid Input Data',400);
   
    const bar = new Bars(req.body.bars);
    await bar.save();
    res.redirect(`/bars/${bar._id}`);
}))

//Request
app.get('/bars',catchAsync(async(req,res)=>{
    const bars = await Bars.find({});
    res.render('bars/index',{bars});
}))

app.get('/bars/:id',catchAsync(async(req,res)=>{
    const {id} = req.params;
    const bar = await Bars.findById(id).populate('reviews');
    res.render('bars/show',{bar});
}))
//Update
app.get('/bars/:id/edit', catchAsync(async(req,res)=>{
    const {id} =req.params;
    const bar = await Bars.findById(id);
    res.render('bars/edit',{bar});
}))

app.put('/bars/:id', catchAsync(async(req,res)=>{
    const {id} = req.params;
    const bar = await Bars.findByIdAndUpdate(id,{...req.body.bars});
    res.redirect(`/bars/${bar._id}`);
}))

//Delete
app.delete('/bars/:id',catchAsync(async(req,res)=>{
    const {id} = req.params;
    const bar = await Bars.findByIdAndDelete(id);
    res.redirect('/bars');
}))

app.delete('/bars/:id/reviews/:reviewId',catchAsync(async(req,res)=>{
    const {id, reviewId} = req.params;
    await Bars.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/bars/${id}`);
}))

app.get('/error',(req,res)=>{
    blablah.blah();
})
//review route
app.post('/bars/:id/review', catchAsync(async(req,res)=>{
    const bar = await Bars.findById(req.params.id);
    const review = new Review(req.body.review);
    bar.reviews.push(review);
    await review.save();
    await bar.save();
    res.redirect(`/bars/${bar._id}`)
}))
//all routes not called.
app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not Found',404))
})



//error handler (this is the next.)
app.use((err,req,res,next)=>{
    const {statusCode = 500, message = 'Something went wrong'} = err;
    // res.status(statusCode).send(message)
    res.status(statusCode).render('partials/error',{statusCode,message})
})

app.listen(8080, ()=>{
    console.log('Running on Port 8080')
})