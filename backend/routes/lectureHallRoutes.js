const express = require('express');
const router = express.Router();
const { createLectureHall, getAllLectureHalls } = require('../controllers/lectureHallController');

router.get('/lecturehalls', getAllLectureHalls);
router.post('/lecturehalls', createLectureHall);

module.exports = router;
