const LectureSchedule = require('../models/scheduleModel');
const mongoose = require('mongoose');

exports.createSchedule = async (req, res) => {
    const { date, startTime, endTime, lecturerId, scheduleStatus, batch, department, lectureHallId } = req.body;

    try {
        const startDate = new Date(`${date}T${startTime}`);
        const endDate = new Date(`${date}T${endTime}`);

        const existingSchedules = await LectureSchedule.find({
            department: department,
            batch: batch,
            scheduleStatus: { $nin: ["Cancelled", "Postponed"] },
            date: new Date(date),
            $or: [
                { startTime: { $lt: endDate }, endTime: { $gt: startDate } }
            ]
        });

        if (existingSchedules.length > 0) {
            return res.status(400).json({
                message: "Conflict detected: There is already a lecture scheduled during this time for the same department and batch."
            });
        }

        const newSchedule = new LectureSchedule({
            date,
            startTime: startDate,
            endTime: endDate,
            lecturerId,
            scheduleStatus,
            batch,
            department,
            lectureHallId
        });

        const savedSchedule = await newSchedule.save();

        res.status(201).json({
            message: "Lecture schedule created successfully",
            data: savedSchedule
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create lecture schedule",
            error: error.message
        });
    }
};

exports.updateScheduleStatus = async (req, res) => {
    const { scheduleId, newStatus } = req.body;

    try {
        const updatedSchedule = await LectureSchedule.findByIdAndUpdate(
            scheduleId,
            { scheduleStatus: newStatus },
            { new: true, runValidators: true }
        );

        if (!updatedSchedule) {
            return res.status(404).json({ message: "Lecture schedule not found" });
        }

        res.status(200).json({
            message: "Schedule status updated successfully",
            data: updatedSchedule
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update lecture schedule",
            error: error.message
        });
    }
};

exports.getMonthlyScheduleSummary = async (req, res) => {
    const { departmentId, batchId } = req.query;

    try {
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1);

        const schedules = await LectureSchedule.aggregate([
            {
                $match: {
                    department: new mongoose.Types.ObjectId(departmentId),
                    batch: new mongoose.Types.ObjectId(batchId),
                    date: { $gte: startOfYear, $lt: endOfYear }
                }
            },
            {
                $project: {
                    month: { $month: "$date" },
                    scheduleStatus: 1
                }
            },
            {
                $group: {
                    _id: "$month",
                    Scheduled: {
                        $sum: { $cond: [{ $eq: ["$scheduleStatus", "Scheduled"] }, 1, 0] }
                    },
                    Completed: {
                        $sum: { $cond: [{ $eq: ["$scheduleStatus", "Completed"] }, 1, 0] }
                    },
                    Cancelled: {
                        $sum: { $cond: [{ $eq: ["$scheduleStatus", "Cancelled"] }, 1, 0] }
                    },
                    Postponed: {
                        $sum: { $cond: [{ $eq: ["$scheduleStatus", "Postponed"] }, 1, 0] }
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        res.status(200).json({
            message: "Monthly schedule summary retrieved successfully",
            data: schedules.map(monthData => ({
                month: monthData._id,
                Scheduled: monthData.Scheduled,
                Completed: monthData.Completed,
                Cancelled: monthData.Cancelled,
                Postponed: monthData.Postponed
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve monthly schedule summary",
            error: error.message
        });
    }
};

exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await LectureSchedule.find()
            .populate('lecturerId', 'name')
            .populate('batch', 'batch')
            .populate('department', 'department')
            .populate('lectureHallId', 'name');

        res.status(200).json({
            message: "All schedules retrieved successfully",
            data: schedules
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve schedules",
            error: error.message
        });
    }
};

exports.updateSchedule = async (req, res) => {
    const { scheduleId } = req.params;
    const { date, startTime, endTime, lecturerId, scheduleStatus, batch, department, lectureHallId } = req.body;

    try {
        const updateFields = {};
        if (date) updateFields.date = new Date(date);
        if (startTime) updateFields.startTime = new Date(`${date}T${startTime}`);
        if (endTime) updateFields.endTime = new Date(`${date}T${endTime}`);
        if (lecturerId) updateFields.lecturerId = lecturerId;
        if (scheduleStatus) updateFields.scheduleStatus = scheduleStatus;
        if (batch) updateFields.batch = batch;
        if (department) updateFields.department = department;
        if (lectureHallId) updateFields.lectureHallId = lectureHallId;

        const updatedSchedule = await LectureSchedule.findByIdAndUpdate(
            scheduleId,
            updateFields,
            { new: true, runValidators: true }
        );

        if (!updatedSchedule) {
            return res.status(404).json({ message: "Lecture schedule not found" });
        }

        res.status(200).json({
            message: "Schedule updated successfully",
            data: updatedSchedule
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update lecture schedule",
            error: error.message
        });
    }
};