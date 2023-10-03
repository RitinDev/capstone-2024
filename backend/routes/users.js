const express = require('express');
const router = express.Router();

// @route   GET api/users/test
// @desc    Test route
router.get('/test', (req, res) => {
    res.send('User route test');
});

module.exports = router;
