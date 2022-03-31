const { captureRejectionSymbol } = require('events');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var cartSchema = new Schema({
    
    name:  {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    language:  {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        
    },
    qty: {
        type: Number,
        required: true
    }


}, {
    timestamps: true
});

module.exports = cartSchema;