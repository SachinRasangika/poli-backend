const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Collection = new Schema({
    collectorId: {
        type: String,
        required: true
    },
    loanId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('collections', Collection);