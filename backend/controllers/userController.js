const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Student = require('../models/studentModel');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const saltRounds = 10;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads');
        require('fs').mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg and .gif format allowed!'));
        }
    }
}).single('profileImage');

exports.createUser = (req, res) => {
    console.log("data", req.body)
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).send({ message: 'Error with file upload', error: err.message });
        } else {
            const { name, email, password, role, details } = req.body;
            console.log("name", name)
            console.log("details", details)
            try {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                const newUser = new User({
                    name,
                    email,
                    password: hashedPassword,
                    role,
                    profileImage: req.file ? req.file.filename : null
                });

                const savedUser = await newUser.save();

                if (role === 'Student' && details) {
                    const newStudent = new Student({
                        ...details,
                        userId: savedUser._id
                    });
                    await newStudent.save();
                    savedUser.roleRef = newStudent._id;
                    await savedUser.save();
                }

                res.status(201).send({ message: 'User created successfully', user: savedUser });
            } catch (error) {
                res.status(500).send({ message: 'Error creating user', error: error.message });
            }
        }
    });
};


exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('roleRef');
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving user', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (user.role === 'Student') {
            await Student.findOneAndDelete({ userId: user._id });
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting user', error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    console.log("search", req.query)
    const { page = 1, limit = 10, role, department, batch } = req.query;
    const query = {};
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        populate: {
            path: 'roleRef',
            match: {}
        }
    };

    if (role) {
        query.role = role;
    }

    if (role === 'Student') {
        if (department) {
            options.populate.match.department = department;
        }
        if (batch) {
            options.populate.match.batch = batch;
        }
    }

    try {
        let users = await User.paginate(query, options);

        if (role === 'Student') {
            users.docs = users.docs.filter(user => {
                if (!user.roleRef) return false;
                if (department && user.roleRef.department.toString() !== department) return false;
                if (batch && user.roleRef.batch.toString() !== batch) return false;
                return true;
            });
            users.totalDocs = users.docs.length;
            users.totalPages = Math.ceil(users.totalDocs / limit);
        }
        console.log("user", users)
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving users', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, profileImage, details } = req.body;
    console.log("body", req.body)
    try {
        const updateFields = {};

        if (name) updateFields.name = name;
        if (email) updateFields.email = email;
        if (profileImage) updateFields.profileImage = profileImage;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            updateFields.password = hashedPassword;
        }

        const objectId = new mongoose.Types.ObjectId(id);
        console.log("updateFields", updateFields)
        const updatedUser = await User.findByIdAndUpdate(objectId, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (updatedUser.role === 'Student' && details) {
            const { department, batch } = details;
            const updateStudentFields = {};

            if (department) updateStudentFields.department = department;
            if (batch) updateStudentFields.batch = batch;

            const updatedStudent = await Student.findOneAndUpdate(
                { userId: updatedUser._id },
                updateStudentFields,
                { new: true }
            );

            if (!updatedStudent) {
                return res.status(404).send({ message: 'Student details not found' });
            }
        }

        res.status(200).send({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).send({ message: 'Error updating user', error: error.message });
    }
};

exports.getAllLecturers = async (req, res) => {
    try {
        const lecturers = await User.find({ role: 'Lecturer' }).populate('roleRef');
        res.status(200).send(lecturers);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving lecturers', error: error.message });
    }
};