const express = require('express');
const router = express.Router();
const catchAsync =require('../helpers/catchAsync');
const ExpressError =require('../helpers/ExpressError');
const Bars = require('../models/bars');
const methodOverride = require('method-override');

//Create
router.get('/new',(req,res)=>{
    res.render('bars/new')
})

router.post('/', catchAsync( async(req,res)=>{
    // if(!req.body.bars) throw new ExpressError('Invalid Input Data',400);
   
    const bar = new Bars(req.body.bars);
    await bar.save();
    req.flash('success','This is the flash message for success');
    res.redirect(`/bars/${bar._id}`);
}))

//Request
router.get('/',catchAsync(async(req,res)=>{
    const bars = await Bars.find({});
    res.render('bars/index',{bars});
}))

router.get('/:id',catchAsync(async(req,res)=>{
    const {id} = req.params;
    const bar = await Bars.findById(id).populate('reviews');
    if(!bar){
        req.flash('error', 'Cannot find this bar');
        return res.redirect('/bars');
    }
    res.render('bars/show',{bar});
}))
//Update
router.get('/:id/edit', catchAsync(async(req,res)=>{
    const {id} =req.params;
    const bar = await Bars.findById(id);
    if(!bar){
        req.flash('error', 'Cannot find this bar to edit!');
        return res.redirect('/bars');
    }
    res.render('bars/edit',{bar});
}))

router.put('/:id', catchAsync(async(req,res)=>{
    const {id} = req.params;
    const bar = await Bars.findByIdAndUpdate(id,{...req.body.bars});
    req.flash('success','Successfully Updated bars');
    res.redirect(`/bars/${bar._id}`);
}))

//Delete
router.delete('/:id',catchAsync(async(req,res)=>{
    const {id} = req.params;
    const bar = await Bars.findByIdAndDelete(id);
    req.flash('success','Deleted!');
    res.redirect('/bars');
}))

module.exports = router;