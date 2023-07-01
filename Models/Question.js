const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
    title: {
        type: String, // Fix: Specify the correct data type as String
        required: true
    },
    vote: {
        type: Boolean,
        default: false
    },
    options: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Option'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Question', questSchema);
