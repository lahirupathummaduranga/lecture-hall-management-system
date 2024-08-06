const Batch = require('../models/batchModel');

exports.createBatch = async (req, res) => {
    const { batch } = req.body;

    try {
        const newBatch = new Batch({
            batch
        });

        const savedBatch = await newBatch.save();

        res.status(201).json({
            message: "Batch created successfully",
            batch: savedBatch
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create batch",
            error: error.message
        });
    }
};

exports.getAllBatches = async (req, res) => {
    try {
        const batches = await Batch.find({});

        res.status(200).json({
            message: "Batches retrieved successfully",
            batches: batches
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve batches",
            error: error.message
        });
    }
};

