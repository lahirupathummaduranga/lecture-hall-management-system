const express = require('express');
const router = express.Router();
const { reportIssue, getAllIssues, deleteIssue } = require('../controllers/issueController'); // Import deleteIssue

// Route to report an issue
router.post('/issues', reportIssue);

// Route to get all reported issues
router.get('/issues', getAllIssues);

// Route to delete an issue by ID
router.delete('/issues/:id', deleteIssue); // New DELETE route

module.exports = router;
