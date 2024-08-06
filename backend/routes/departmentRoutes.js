const express = require('express');
const router = express.Router();
const { createDepartment, getAllDepartments } = require('../controllers/departmentController');

router.post('/departments', createDepartment);
router.get('/departments', getAllDepartments)
module.exports = router;
