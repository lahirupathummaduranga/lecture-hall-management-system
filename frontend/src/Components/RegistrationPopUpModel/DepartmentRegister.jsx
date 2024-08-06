import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';


function DepartmentRegister() {
    const [department, setDepartment] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/departments', { department });
            setMessage(response.data.message);
            setDepartment('');

            setTimeout(() => {
                setMessage('');
            }, 5000);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create department');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <TextField
                fullWidth
                label="Department Name"
                value={department}
                onChange={handleDepartmentChange}
                margin="normal"
                required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Create Department
            </Button>
        </Box>
    );
}

export default DepartmentRegister

