const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        uniqe: true
    },
    otp: String,
    createdAt: Date,
    expiresAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Otp', otpSchema);