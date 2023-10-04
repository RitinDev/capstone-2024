const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../config/middleware/auth');
const Question = require('../models/Question');

const router = express.Router();

// @route   POST api/questions
// @desc    Create a new question
router.post('/', [auth, [
    check('content', 'Content of the question is required').notEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Create new question
        const newQuestion = new Question({
            content: req.body.content,
            submittedUser: req.user.id
        });

        const question = await newQuestion.save();
        res.json(question);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ msg: 'Question already exists. Please submit a unique question.' });
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/questions/random
// @desc    Get a random question
router.get('/random', async (req, res) => {
    try {
        const count = await Question.countDocuments();
        const random = Math.floor(Math.random() * count);
        const question = await Question.findOne().skip(random);
        res.json(question);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
