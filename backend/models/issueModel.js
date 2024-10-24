// models/issueModel.js
const mongoose = require('mongoose');

// Define the schema
const issueSchema = new mongoose.Schema({
    issueDescription: {
        type: String,
        required: true,
    },
    lectureHall: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the model
const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
