// to install npm packages
const mongoose = require('mongoose');

// creation of the gym store
const gymstoreSchema = new mongoose.Schema({
    name: {
        type: String
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    price: {
        type: String,
    },
    summary: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true }); // timestamps create when the file is created

// export file
module.exports = mongoose.model('Gymstores', gymstoreSchema);