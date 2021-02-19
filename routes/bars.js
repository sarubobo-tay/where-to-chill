const express = require('express');
const router = express.Router();
const catchAsync =require('../helpers/catchAsync');
const bars = require('../controllers/bars');
const ExpressError =require('../helpers/ExpressError');
const Bars = require('../models/bars');
const methodOverride = require('method-override');
const {isLoggedIn, isOwner} = require('../middleware');

router.route('/')
    .get(catchAsync(bars.index))
    .post(isLoggedIn,catchAsync(bars.create))

router.get('/new', isLoggedIn, bars.newForm);

router.route('/:id')
    .get(catchAsync(bars.showBar))
    .put(catchAsync(bars.submitEdit))
    .delete(isLoggedIn,catchAsync(bars.deleteBar))

router.get('/:id/edit', isLoggedIn, isOwner,    catchAsync(bars.editForm));

module.exports = router;