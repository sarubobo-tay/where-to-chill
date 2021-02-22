const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Bars = require('../models/bars');
var seed = require('./seed.json');

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Mongo Connection Open")
})
.catch((e) => {
    console.log("Mongo Error")
    console.log(e)
})

const seedDB = async()=>{
    await Bars.deleteMany({});
    //for length of seed.list of bars, below  new bars(seed.listofbars[i])
    for(bar in seed.listofbars){
        const addbar = new Bars(seed.listofbars[bar]);
        await addbar.save();
    }
}

seedDB()
.then(()=>{
    mongoose.connection.close()
})