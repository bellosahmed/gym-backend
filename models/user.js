const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        //required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        // required: true,
        minlenght: 5
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
        enum: ['user', 'admin'],
        default: "user"
    },
    bloodgroup: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema);