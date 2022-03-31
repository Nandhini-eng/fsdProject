const mongoose = require("mongoose")
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const reviewSchema = require('./reviews');

const feedbacksSchema = new Schema({
    firstname:{
        type: String,
        required:true
    },
    lastname:{
        type: String,
        required:true
    },
    telnum:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    contacttype:{
        type: string,
        required:true
    },
    agree:{
        type: Boolean,
        required:true
    },
    message:{
        type: String,
        required:true
    },
},{
    timestamps: true       
});
var feedback = mongoose.model('feedback', feedbacksSchema);

module.exports = feedback;