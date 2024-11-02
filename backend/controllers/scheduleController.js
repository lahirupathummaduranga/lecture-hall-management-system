const LectureSchedule = require('../models/scheduleModel');
const mongoose = require('mongoose');

// Function to check for schedule conflicts
async function checkScheduleConflict({ date, startTime, endTime, department, lectureHallId, excludeScheduleId = null }) {
    const startDate = new Date(`${date}T${startTime}`);
    const endDate = new Date(`${date}T${endTime}`);

    const conflictQuery = {
        department: department,
        lectureHallId: lectureHallId,
        date: new Date(date),
        _id: { $ne: excludeScheduleId }, // Exclude the current schedule if updating
        $or: [
            { startTime: { $lt: endDate }, endTime: { $gt: startDate } }
        ],
        scheduleStatus: { $nin: ["Cancelled", "Postponed"] }
    };

    const existingSchedules = await LectureSchedule.find(conflictQuery);
    return existingSchedules.length > 0;
}

// Create a new lecture schedule
exports.createSchedule = async (req, res) => {
    const { subjectName, date, startTime, endTime, lecturerId, scheduleStatus, batch, department, lectureHallId } = req.body;

    try {
        const conflict = await checkScheduleConflict({
            date,
            startTime,
            endTime,
            department,
            lectureHallId
        });

        if (conflict) {
            return res.status(400).json({
                message: "Booking Unavailable: The selected lecture hall is already booked at this time by another lecturer. Please choose a different time or lecture hall."
            });
        }

        const newSchedule = new LectureSchedule({
            subjectName,
            date,
            startTime: new Date(`${date}T${startTime}`),
            endTime: new Date(`${date}T${endTime}`),
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

// Update an existing lecture schedule
exports.updateSchedule = async (req, res) => {
    const { scheduleId } = req.params;
    const { subjectName, date, startTime, endTime, lecturerId, scheduleStatus, batch, department, lectureHallId } = req.body;

    try {
        const conflict = await checkScheduleConflict({
            date,
            startTime,
            endTime,
            department,
            lectureHallId,
            excludeScheduleId: scheduleId
        });

        if (conflict) {
            return res.status(400).json({
                message: "Booking Unavailable: The selected lecture hall is already booked at this time by another lecturer. Please choose a different time or lecture hall."
            });
        }

        const updateFields = {};
        if (subjectName) updateFields.subjectName = subjectName;
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

// Get all schedules
exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await LectureSchedule.find()
            .populate('lecturerId', 'name')
            .populate('batch', 'batch')
            .populate('department', 'department')
            .populate('lectureHallId', 'name');

        res.status(200).json({
            message: "All schedules retrieved successfully",
            data: schedules.map(schedule => ({
                ...schedule.toObject(),
                subjectName: schedule.subjectName // Include subject name in response
            }))
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve schedules",
            error: error.message
        });
    }
};

// Update the schedule status
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
            message: "Failed to update schedule status",
            error: error.message
        });
    }
};

// Get monthly schedule summary
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

// Delete a lecture schedule
exports.deleteSchedule = async (req, res) => {
    const { scheduleId } = req.params;

    try {
        const deletedSchedule = await LectureSchedule.findByIdAndDelete(scheduleId);

        if (!deletedSchedule) {
            return res.status(404).json({ message: "Lecture schedule not found" });
        }

        res.status(200).json({
            message: "Schedule deleted successfully",
            data: deletedSchedule
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete lecture schedule",
            error: error.message
        });
    }
};
