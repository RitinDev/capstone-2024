const express = require('express');
const router = express.Router();

const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');

// Endpoint to validate a question
router.post('/question/:questionId', async (req, res) => {
    const userID = req.body.userID;
    const questionId = req.params.questionId;

    try {
        const user = await User.findById(userID);
        const question = await Question.findById(questionId);

        if (!user || !question) {
            return res.status(404).json({ message: 'User or Question not found.' });
        }

        if (question.validatedBy.includes(userID)) {
            return res.status(400).json({ message: 'User already validated this question.' });
        }

        question.validatedBy.push(userID);
        await question.save();

        res.json({ message: 'Question validated successfully!' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Endpoint to validate an answer
router.post('/answer/:answerId', async (req, res) => {
    const userID = req.body.userID;
    const answerId = req.params.answerId;

    try {
        const user = await User.findById(userID);
        const answer = await Answer.findById(answerId);

        if (!user || !answer) {
            return res.status(404).json({ message: 'User or Answer not found.' });
        }

        if (answer.validatedBy.includes(userID)) {
            return res.status(400).json({ message: 'User already validated this answer.' });
        }

        answer.validatedBy.push(userID);
        await answer.save();

        res.json({ message: 'Answer validated successfully!' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
