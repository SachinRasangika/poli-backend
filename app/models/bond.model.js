const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bonds = new Schema({
    clientId: {
        type: String,
        required: true
    },
    image: {
        type: Buffer
    },
    name: {
        type: String,
        required: true 
    },
    details: {
        type: String,
        required: true 
    },
    type: {
        type: String,
        required: true
    },
    released: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('bonds', Bonds);