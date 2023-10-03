const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    associatedQuestion: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    submittedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    validatedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Answer', answerSchema);
