const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./dbConfig');
const userRoutes = require('./Routes/userRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '1000kb' }));
app.use(bodyParser.urlencoded({ limit: '1000kb', extended: true }));
app.use(express.json());

app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173'
}));

connectDB();

app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
