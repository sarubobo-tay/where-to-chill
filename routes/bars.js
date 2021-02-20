const express = require('express');
const router = express.Router();
const catchAsync =require('../helpers/catchAsync');
const bars = require('../controllers/bars');
const ExpressError =require('../helpers/ExpressError');
const Bars = require('../models/bars');
const methodOverride = require('method-override');
const {isLoggedIn, isOwner} = require('../middleware');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});


router.route('/')
    .get(catchAsync(bars.index))
    .post(isLoggedIn,upload.array('image'),catchAsync(bars.create))

router.get('/new', isLoggedIn, bars.newForm);

router.route('/:id')
    .get(catchAsync(bars.showBar))
    .put(upload.array('image'),catchAsync(bars.submitEdit))
    .put(upload.array('image'),catchAsync(bars.submitImage))
    .delete(isLoggedIn,catchAsync(bars.deleteBar))

router.get('/:id/edit', isLoggedIn, isOwner,    catchAsync(bars.editForm));

router.get('/:id/add', isLoggedIn, isOwner,    catchAsync(bars.addImageForm));

module.exports = router;