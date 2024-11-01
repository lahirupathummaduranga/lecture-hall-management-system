// controllers/issueController.js
const Issue = require('../models/issueModel');

// Function to handle reporting an issue
const reportIssue = async (req, res) => {
    const { issueDescription, lectureHall } = req.body;

    try {
        const newIssue = new Issue({ issueDescription, lectureHall });
        await newIssue.save();
        res.status(201).json({ message: 'Issue reported successfully', issue: newIssue });
    } catch (error) {
        res.status(500).json({ message: 'Error reporting issue', error: error.message });
    }
};

// Function to get all issues
const getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.find();
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving issues', error: error.message });
    }
};

// Function to delete an issue by ID
const deleteIssue = async (req, res) => {
    const { id } = req.params;

    try {
        await Issue.findByIdAndDelete(id);
        res.status(200).json({ message: 'Issue marked as complete and deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting issue', error: error.message });
    }
};

module.exports = {
    reportIssue,
    getAllIssues,
    deleteIssue,
};
