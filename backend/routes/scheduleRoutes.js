const express = require('express');
const router = express.Router();
const { createSchedule, updateScheduleStatus, getMonthlyScheduleSummary, getAllSchedules, updateSchedule } = require('../controllers/scheduleController');

router.post('/schedules', createSchedule);
router.put('/schedules/status', updateScheduleStatus);
router.put('/schedules/:scheduleId', updateSchedule);
router.get('/schedules/monthly-summary', getMonthlyScheduleSummary);
router.get('/schedules', getAllSchedules);
module.exports = router;
