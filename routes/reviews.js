const express = require('express');
const router = express.Router({mergeParams:true});

const catchAsync =require('../helpers/catchAsync');
const ExpressError =require('../helpers/ExpressError');

const Bars = require('../models/bars');
const Review = require('../models/review');
const {isLoggedIn, isOwner, isReviewOwner} = require('../middleware');
const user = require('../models/user');


router.post('/', catchAsync(async(req,res)=>{
    const bar = await Bars.findById(req.params.id);
    const review = new Review(req.body.review);
    if(req.user == null){
        review.author = '602ea2e247191a745d76f2de'
    } else {
        review.author = req.user._id
    }
    bar.reviews.push(review);
    await review.save();
    await bar.save();
    req.flash('success','Review Posted!');
    res.redirect(`/bars/${bar._id}`)
}))

router.delete('/:reviewId',isLoggedIn, isReviewOwner, catchAsync(async(req,res)=>{
    const {id, reviewId} = req.params;
    await Bars.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully Deleted Comment');
    // res.send('deleted')
    res.redirect(`/bars/${id}`);
}))

module.exports = router;