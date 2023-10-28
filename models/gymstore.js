const mongoose = require('mongoose');

const gymstoreSchema = new mongoose.Schema({
    price: {
        type: Number
    },
    clothes: {
        type: String,
    },
    proteins: {
        type: String,
    },
    equipments: {
        type: String,
    }, ratingsAverage: {
        type: Number,
        default: 3.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
    }, summary: {
        type: String,
        trim: true,

    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String
    },

}, { timestamps: true });

module.exports = mongoose.model('Gymstore', gymstoreSchema);