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
}, { timeseries: true });

module.exports = mongoose.model('Membership', membershipSchema);
