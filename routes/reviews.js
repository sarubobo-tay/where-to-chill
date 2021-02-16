const express = require('express');
const router = express.Router({mergeParams:true});

const catchAsync =require('../helpers/catchAsync');
const ExpressError =require('../helpers/ExpressError');

const Bars = require('../models/bars');
const Review = require('../models/review');


router.post('/', catchAsync(async(req,res)=>{
    const bar = await Bars.findById(req.params.id);
    const review = new Review(req.body.review);
    bar.reviews.push(review);
    await review.save();
    await bar.save();
    req.flash('success','Review Posted!');
    res.redirect(`/bars/${bar._id}`)
}))

router.delete('/:reviewId',catchAsync(async(req,res)=>{
    console.log(req.params);
    console.log(res.body);
    const {id, reviewId} = req.params;
    await Bars.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully Deleted Comment');
    // res.send('deleted')
    res.redirect(`/bars/${id}`);
}))

module.exports = router;