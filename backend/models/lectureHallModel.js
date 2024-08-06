const mongoose = require('mongoose');

const lectureHallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('LectureHall', lectureHallSchema);
