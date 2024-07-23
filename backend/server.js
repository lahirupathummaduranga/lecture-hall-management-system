const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./dbConfig');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '1000kb' }));
app.use(bodyParser.urlencoded({ limit: '1000kb', extended: true }));
app.use(express.json());

app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000'
}));


connectDB();

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
