const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const cartSchema = require('./cart');





const ordersSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    NameOnCard: {
        type: String,
        required: true
    },
    CreditCardNum: {
        type: String,
        required: true
    },
    ExpMon: {
        type: Number,
        required: true
    },
    ExpYear: {
        type: Number,
        required: true
    },
    Cvv: {
        type: Number,
        required: true
    },
    cart: [cartSchema],
    user: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    items: {
        type: Number,
        default: false      
    },
    date:{
        type:String,
        default :false

    },
    
    
},{
    timestamps: true
});

var Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;