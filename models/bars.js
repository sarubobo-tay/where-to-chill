const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const BarSchema = new Schema({
    // id: String,
    // alias:String,
    name: {
        type: String,
        required:true
    },
    image_url:String,
    is_closed: Boolean,
    url: String,
    // review_count:Number,
    categories:[{
        _id:{id:false},
        alias:String,
        title:String
    }],
    rating:Number,
    coordinates:{
        latitude:Number,
        longitude:Number
        },
    // transactions: Array,
    price:{
        type: String,
        enum:['$','$$','$$$','$$$$','$$$$$']
    },
    location:
        {
        // _id:{id:false},
    //     address1:String,
    //     address2:String,
    //     address3:String,
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
        display_address:[{type:String}]
    },
    phone:String,
    display_phone:String,
    // distance:Number
    author:{
        type: Schema.Types.ObjectId,
        ref:'User',
        default: "602e91fdc9fbf77222b16150"
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});

BarSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.remove({
            _id:{
                $in:doc.reviews
            }
        })
    }
    console.log("deleted!");
})

module.exports = mongoose.model('Bars',BarSchema);