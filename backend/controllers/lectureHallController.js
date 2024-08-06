const LectureHall = require('../models/lectureHallModel');

exports.createLectureHall = async (req, res) => {
    const { name } = req.body;

    try {
        const newLectureHall = new LectureHall({
            name
        });

        const savedLectureHall = await newLectureHall.save();

        res.status(201).json({
            message: "Lecture hall created successfully",
            lectureHall: savedLectureHall
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create lecture hall",
            error: error.message
        });
    }
};

exports.getAllLectureHalls = async (req, res) => {
    try {
        const lectureHalls = await LectureHall.find();

        res.status(200).json({
            message: "Lecture halls retrieved successfully",
            lectureHalls
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve lecture halls",
            error: error.message
        });
    }
};