const express = require('express');
const router = express.Router({mergeParams:true});

const catchAsync =require('../helpers/catchAsync');
const ExpressError =require('../helpers/ExpressError');

const reviews = require('../controllers/reviews');
// const Bars = require('../models/bars');
// const Review = require('../models/review');
const {isLoggedIn, isOwner, isReviewOwner} = require('../middleware');
const user = require('../models/user');

//create
router.post('/', catchAsync(reviews.submitReview));
//delete
router.delete('/:reviewId',isLoggedIn, isReviewOwner, catchAsync(reviews.deleteReview));

module.exports = router;