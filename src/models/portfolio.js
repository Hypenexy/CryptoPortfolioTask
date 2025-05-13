const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    holdings: [
        {
            symbol: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model('Portfolio', portfolioSchema);