// install npm packages
const mongoose = require("mongoose");

// creation of the membership plan
const membershipSchema = new mongoose.Schema({
    name: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: {
        type: String,
    },
    summary: {
        type: String
    }
}, { timestamps: true }); // timestamps create when the file is created

// export files
module.exports = mongoose.model('Membership', membershipSchema);
