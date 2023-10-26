const mongoose = require('mongoose');

const gymstoreSchema = new mongoose.Schema({
    name: {
        type: String
    },

}, { timestamps: true });

module.exports = mongoose.model('Gymstore', gymstoreSchema);