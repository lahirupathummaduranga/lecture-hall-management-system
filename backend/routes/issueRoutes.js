const express = require('express');
const router = express.Router();
const { reportIssue, getAllIssues } = require('../controllers/issueController');

// Route to report an issue
router.post('/issues', reportIssue);

// Route to get all reported issues (optional)
router.get('/issues', getAllIssues);

module.exports = router;
