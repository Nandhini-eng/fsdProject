const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reviewSchema = new Schema({
    itemId: {
        type: String,
        required: true
    },
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Reviews = mongoose.model('Review', reviewSchema);

module.exports = Reviews;