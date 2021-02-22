const { string } = require('joi');
const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;
const opts = {toJSON:{virtuals:true}};

const BarSchema = new Schema({
    // id: String,
    // alias:String,
    name: {
        type: String,
        required:true
    },
    images:[{
        _id:{id:false},
        url:String,
        filename:String,
    }],
    is_closed: Boolean,
    url: String,
    // review_count:Number,
    categories:[{
        _id:{id:false},
        alias:String,
        title:String
    }],
    rating:Number,
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
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
        default: "6032a0d199247200155947e7"
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
},opts);

BarSchema.virtual('properties.mapPopUp').get(function (){
    return `<strong><a href="/bars/${this._id}">${this.name}</a></strong>
    <p><strong>Price: </strong>${this.price}</p>
    <p>><strong>Address: </strong>${this.location.display_address}</p>
    <p>><strong>Contact Them: </strong>${this.display_phone}</p>`

})

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