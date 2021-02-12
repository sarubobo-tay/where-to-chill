const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Schema = mongoose.Schema;
var Bars = require('./models/bars');
const { red } = require('colors');
const { findById, findByIdAndDelete } = require('./models/bars');

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



app.get('/',(req,res)=>{
    res.render('home')
})

//Create
app.get('/bars/new',(req,res)=>{
    res.render('bars/new')
})

app.post('/bars', async(req,res)=>{
    // res.send(req.body)
    const bar = new Bars(req.body.bars);
    await bar.save();
    res.redirect(`/bars/${bar._id}`);
})

//Request
app.get('/bars',async(req,res)=>{
    const bars = await Bars.find({});
    res.render('bars/index',{bars});
})

app.get('/bars/:id',async(req,res)=>{
    const {id} = req.params;
    const bar = await Bars.findById(id);
    res.render('bars/show',{bar});
})
//Update
app.get('/bars/:id/edit', async(req,res)=>{
    const {id} =req.params;
    const bar = await Bars.findById(id);
    res.render('bars/edit',{bar});
})

app.put('/bars/:id',async(req,res)=>{
    const {id} = req.params;
    const bar = await Bars.findByIdAndUpdate(id,{...req.body.bars});
    res.redirect(`/bars/${bar._id}`);
})

//Delete
app.delete('/bars/:id',async(req,res)=>{
    const {id} = req.params;
    const bar = await Bars.findByIdAndDelete(id);
    res.redirect('/bars');
})


app.listen(8080, ()=>{
    console.log('Running on Port 8080')
})