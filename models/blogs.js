const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const reviewSchema = require('./reviews');


const blogSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    reviews: [ reviewSchema ]
},{
    timestamps: true
});

var Blogs = mongoose.model('Blogs', blogSchema);

module.exports = Blogs;