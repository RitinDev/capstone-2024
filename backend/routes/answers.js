const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../config/middleware/auth');
const Answer = require('../models/Answer');
const Question = require('../models/Question');

const router = express.Router();

// @route   POST api/answers
// @desc    Submit an answer to a specific question
router.post('/', [auth, [
    check('content', 'Content of the answer is required').notEmpty(),
    check('associatedQuestion', 'Associated question ID is required').isMongoId()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { content, associatedQuestion } = req.body;

        // Create new answer
        const newAnswer = new Answer({
            content,
            associatedQuestion,
            submittedUser: req.user.id
        });

        const answer = await newAnswer.save();

        // Find the associated question and update its answers array
        const question = await Question.findById(associatedQuestion);
        if (question && !question.answers.includes(answer._id)) {
            question.answers.push(answer._id);
            await question.save();
        }

        res.json(answer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/answers/random?questionId=<questionId>
// @desc    Get a random answer based on the associated question
router.get('/random', async (req, res) => {
    try {
        const questionId = req.query.questionId;

        // Fetch the question first
        const question = await Question.findById(questionId);
        if (!question || !question.answers.length) {
            return res.status(404).json({ msg: "No answers found for the given question" });
        }

        // Get a random index from the answers array
        const randomIndex = Math.floor(Math.random() * question.answers.length);
        const answerId = question.answers[randomIndex];

        // Fetch the random answer
        const answer = await Answer.findById(answerId);
        res.json(answer);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/answers/:id
// @desc    Retrieve an answer and its associated question
router.get('/:id', async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id).populate('associatedQuestion');
        if (!answer) {
            return res.status(404).json({ msg: 'Answer not found' });
        }
        res.json(answer);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Answer not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
