const express = require('express');
const router = express.Router();
const { createBatch, getAllBatches } = require('../controllers/batchController');

router.post('/batches', createBatch);
router.get('/batches', getAllBatches)

module.exports = router;
