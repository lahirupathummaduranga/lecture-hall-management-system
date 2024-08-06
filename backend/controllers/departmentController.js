const Department = require('../models/departmentModel');

exports.createDepartment = async (req, res) => {
    const { department } = req.body;

    try {
        const newDepartment = new Department({
            department
        });

        const savedDepartment = await newDepartment.save();

        res.status(201).json({
            message: "Department created successfully",
            department: savedDepartment
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create department",
            error: error.message
        });
    }
};

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();

        res.status(200).json({
            message: "Departments retrieved successfully",
            departments
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve departments",
            error: error.message
        });
    }
};
