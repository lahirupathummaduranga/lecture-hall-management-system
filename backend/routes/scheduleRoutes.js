const express = require('express');
const router = express.Router();
const { 
    createSchedule, 
    updateScheduleStatus, 
    getMonthlyScheduleSummary, 
    getAllSchedules, 
    updateSchedule,
    deleteSchedule // Import deleteSchedule function
} = require('../controllers/scheduleController');

// Define routes
router.post('/schedules', createSchedule);
router.put('/schedules/status', updateScheduleStatus);
router.put('/schedules/:scheduleId', updateSchedule);
router.get('/schedules/monthly-summary', getMonthlyScheduleSummary);
router.get('/schedules', getAllSchedules);
router.delete('/schedules/:scheduleId', deleteSchedule); // Add delete route

module.exports = router;
