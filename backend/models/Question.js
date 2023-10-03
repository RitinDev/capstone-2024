const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    submittedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    validatedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Question', questionSchema);
