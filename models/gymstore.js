const mongoose = require('mongoose');

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
}, { timestamps: true });

module.exports = mongoose.model('Gymstores', gymstoreSchema);