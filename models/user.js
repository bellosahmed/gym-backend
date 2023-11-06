// install npm packages
const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

// creation of the user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // email can't be the same with others
    },
    username: {
        type: String,
        //required: true,
        unique: true, // username can't be the same with others
        lowercase: true // username will be in lowercase
    },
    password: {
        type: String,
        // required: true,
        minlenght: 5 // lenght of the password
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    age: {
        type: Number
    },
    dob: {
        type: Date
    },
    gender: {
        type: String
    },
    profilepic: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'super-admin'],
        message: '{VALUE} is not supported',
        default: "user" // when any user is created it will be user not admin
    },
    bloodgroup: {
        type: String
    }
}, { timestamps: true }); // timestamps create when the file is created

userSchema.plugin(uniqueValidator); // to validate user

// export User
module.exports = mongoose.model('Users', userSchema);