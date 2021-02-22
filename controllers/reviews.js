const Bars = require('../models/bars');
const Review = require('../models/review');

module.exports.submitReview = async(req,res)=>{
    const bar = await Bars.findById(req.params.id);
    const review = new Review(req.body.review);
    if(req.user == null){
        review.author = '6032a0d199247200155947e7'
    } else {
        review.author = req.user._id
    }
    bar.reviews.push(review);
    await review.save();
    await bar.save();
    req.flash('success','Review Posted!');
    res.redirect(`/bars/${bar._id}`)
};

module.exports.deleteReview = async(req,res)=>{
    const {id, reviewId} = req.params;
    await Bars.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully Deleted Comment');
    // res.send('deleted')
    res.redirect(`/bars/${id}`);
};