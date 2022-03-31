const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    admin : {
        type : Boolean,
        default : false
    }
})

var users = mongoose.model('users',UserSchema);
module.exports = users;

