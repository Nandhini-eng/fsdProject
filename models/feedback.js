const mongoose = require("mongoose")
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


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
    contactType:{
        type: String,
        required:true
    },
    agree:{
        type: Boolean
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