const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();
const connectDB = require('./dbConfig');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const lectureHallRoutes = require('./routes/lectureHallRoutes');
const batchRoutes = require('./routes/batchRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

const issueRoutes = require('./routes/issueRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadDir = path.join(__dirname, 'uploads');
        require('fs').mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
}).single('profileImage');

app.use(express.json({ limit: '1000kb' }));
app.use(express.urlencoded({ limit: '1000kb', extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', scheduleRoutes);
app.use('/api', lectureHallRoutes);
app.use('/api', batchRoutes);
app.use('/api', departmentRoutes);
app.use('/api', issueRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
