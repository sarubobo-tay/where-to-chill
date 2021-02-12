const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Bars = require('./models/bars');

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

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/makebars',async (req,res)=>{
    const bar = new Bars({name:'Birdie Nam Nam',price:'$$', description:'cool bar at kembangan'});
    await bar.save();
    res.send(bar);
})


app.listen(8080, ()=>{
    console.log('Running on Port 8080')
})