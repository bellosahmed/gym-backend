// to install npm packages
const mongoose = require('mongoose');

// creation of the gym store
const gymstoreSchema = new mongoose.Schema({
    name: {
        type: String
    },
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