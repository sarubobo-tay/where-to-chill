const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body:String,
    rating:Number,
    author: {
        type:Schema.Types.ObjectId,
        ref:'User',
        // default: '602ea2e247191a745d76f2de'
    }
})

module.exports = mongoose.model("Review",reviewSchema);