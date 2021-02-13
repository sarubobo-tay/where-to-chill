const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BarSchema = new Schema({
    id: String,
    alias:String,
    name: {
        type: String,
        required:true
    },
    image_url:String,
    is_closed: Boolean,
    url: String,
    review_count:Number,
    categories:[{
        alias:String,
        title:String
    }],
    rating:Number,
    coordinates:{
        latitude:{
            type:Number
        },
        longitude:{
            type:Number
        }
    },
    transactions: Array,
    price:{
        type: String,
        enum:['$','$$','$$$','$$$$','$$$$$']
    },
    location:{
        address1:String,
        address2:String,
        address3:String,
        city:{
            type:String,
            default:"SG"
        },
        zip_code:Number,
        country:{
            type:String,
            default:"SG"
        },
        state:{
            type:String,
            default:"SG"
        },
        display_address: [{type:String}]
    },
    phone:String,
    display_phone:String,
    distance:Number
});

module.exports = mongoose.model('Bars',BarSchema);