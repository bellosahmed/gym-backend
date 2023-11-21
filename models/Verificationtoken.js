const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    token: {
        type: String,
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }
}, { timestamps: true }); // timestamps create when the file is created


module.exports = mongoose.model('Verification', verificationSchema);