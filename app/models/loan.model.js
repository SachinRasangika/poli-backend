const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dayjs = require('dayjs');

const Loans = new Schema({
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    fullAmount: {
        type: Number,
        required: true,
        min: 0
    },
    remainingAmount: {
        type: Number,
        required: true,
        min: 0
    },
    instalmentAmount: {
        type: Number,
        required: true,
        min: 0
    },
    numberOfInstalments: {
        type: Number,
        required: true,
        min: 0
    },
    interestRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    clientId: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    bondId: {
        type: String
    }
})

module.exports = mongoose.model('loans', Loans);