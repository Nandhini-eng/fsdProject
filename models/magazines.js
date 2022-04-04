const mongoose = require("mongoose")
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const magazinesSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    image:{
        type: String,
        required:true
    },
    language:{
        type: String,
        required:true
    },
    price:{
        type: Currency,
        required:true
    },
    featured:{
        type: Boolean,
        required:true
    },
    category:{
        type: String,
        required:true
    }
},{
    timestamps: true       
});

var Magazines = mongoose.model('Magazines', magazinesSchema);

module.exports = Magazines;