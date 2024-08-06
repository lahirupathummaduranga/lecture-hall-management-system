import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Alert } from '@mui/material';

function LectureHallRegister() {
    const [lectureHall, setLectureHall] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleLectureHallChange = (event) => {
        setLectureHall(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/lecturehalls', { name: lectureHall });
            setMessage(response.data.message);
            setLectureHall('');
            setError('');

            setTimeout(() => {
                setMessage('');
            }, 5000);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create lecture hall');
            setMessage('');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <TextField
                fullWidth
                label="Lecture Hall Name"
                value={lectureHall}
                onChange={handleLectureHallChange}
                margin="normal"
                required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Create Lecture Hall
            </Button>
        </Box>
    );
}

export default LectureHallRegister;
