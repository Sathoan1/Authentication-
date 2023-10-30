const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator')

const userSchema = new Schema({
    email:{
     type: String,
     required: [true, 'Please provide an email address'],
     unique: true,
    validate: [isEmail, 'Please provide a valid email add'],
    },
    username:{
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        minLength: [5, 'minimum username is 5'],
        maxLength: [15, 'max username is 15'],
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
        minLength:[ 7, 'minimum password length is 7'],
    },
    profile:{
        required: true,
        type: String, 
        default: 'https://static.thenounproject.com/png/785821-200.png',
    },
}, 
{timestamps: true})

module.exports = mongoose.model('User', userSchema);