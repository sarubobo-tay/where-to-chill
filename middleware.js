const Bars = require('./models/bars');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'please log in to access this link!')
        return res.redirect('/login');
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const bar = await Bars.findById(id);
    if (!bar.author.equals(req.user._id)) {
        req.flash('error', 'Error. Permission needed to proceed');
        return res.redirect('/home');
    }
    next();
}

module.exports.isReviewOwner = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review.author.equals(req.user._id)) {
        if (!review.author.equals('602ea2e247191a745d76f2de')) {
            req.flash('error', 'Error. Permission needed to proceed');
            return res.redirect(`/bars/${id}`);
        }
    }
    next();
}