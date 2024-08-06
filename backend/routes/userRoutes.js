const express = require('express');
const { createUser, getUser, deleteUser, getAllUsers, updateUser, getAllLecturers } = require('../controllers/userController');
const router = express.Router();

router.post('/users', createUser);
router.get('/users/:id', getUser);
router.delete('/users/:id', deleteUser);
router.get('/users',getAllUsers)
router.put('/users/:id', updateUser);
router.get('/lecturers',getAllLecturers)
module.exports = router;
