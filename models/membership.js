const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: String,
    },
    summary: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);
