const mongoose = require('mongoose');

const lectureScheduleSchema = new mongoose.Schema({
    subjectName: {  // New field for subject name
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    lecturerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    scheduleStatus: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled', 'Postponed'],
        default: 'Scheduled'
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    lectureHallId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LectureHall',
        required: true
    }
});

module.exports = mongoose.model('LectureSchedule', lectureScheduleSchema);
