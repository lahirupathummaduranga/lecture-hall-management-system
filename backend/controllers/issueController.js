// controllers/issueController.js
const Issue = require('../models/issueModel');

// Function to handle reporting an issue
const reportIssue = async (req, res) => {
    const { issueDescription, lectureHall } = req.body;

    try {
        // Create a new issue document
        const newIssue = new Issue({
            issueDescription,
            lectureHall
        });

        // Save the issue to the database
        await newIssue.save();

        // Respond with a success message
        res.status(201).json({ message: 'Issue reported successfully', issue: newIssue });
    } catch (error) {
        res.status(500).json({ message: 'Error reporting issue', error: error.message });
    }
};

// Function to get all issues
const getAllIssues = async (req, res) => {
    try {
        // Retrieve all issues from the database
        const issues = await Issue.find();
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving issues', error: error.message });
    }
};

module.exports = {
    reportIssue,
    getAllIssues,
};
