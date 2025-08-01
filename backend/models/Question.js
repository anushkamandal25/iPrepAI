const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    session: {type: mongoose.Schema.Types.ObjectId, ref: 'Session'},
    question: String,
    answer: String,
    isPinned: {
        type: Boolean,
        default: false
    },
    note: {
        type: String,
    },
},
    { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);