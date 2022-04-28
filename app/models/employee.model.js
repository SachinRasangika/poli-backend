const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employees = new Schema({
    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    position: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String
    },
    userId: {
        type: String
    }
})

module.exports = mongoose.model('employees', Employees);