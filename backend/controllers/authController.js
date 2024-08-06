const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("email", email)
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send({ message: 'Authentication failed. User not found.' });
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            const userDetails = await User.findById(user._id).populate('roleRef');

            return res.status(200).send({ message: 'Logged in successfully', token, user: userDetails });
        } else {
            return res.status(401).send({ message: 'Authentication failed. Wrong password.' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error during authentication', error: error.message });
    }
};

exports.logout = (req, res) => {
    try {
        res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0');

        res.status(200).send({ message: 'Logged out successfully' });
    } catch (error) {

        res.status(500).send({ message: 'Error during logout', error: error.message });
    }
};