import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

const BatchRegister = () => {
    const [batch, setBatch] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleBatchChange = (event) => {
        setBatch(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/batches', { batch });
            setMessage(response.data.message);
            setBatch('');

            setTimeout(() => {
                setMessage('');
            }, 5000);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create batch');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <TextField
                fullWidth
                label="Batch Name"
                value={batch}
                onChange={handleBatchChange}
                margin="normal"
                required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Create Batch
            </Button>
        </Box>
    );
};

export default BatchRegister;
