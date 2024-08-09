import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography, IconButton, styled, Alert } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';

const ImagePreview = styled('div')(({ theme }) => ({
    position: 'relative',
    width: theme.spacing(15),
    height: theme.spacing(15),
    borderRadius: '50%',
    overflow: 'hidden',
    margin: theme.spacing(2, 0)
}));

const OverlayIconButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: 'white',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
}));

function RegisterUserForm() {
    const [departments, setDepartments] = useState([]);
    const [batches, setBatches] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        profileImage: '',
        details: {
            department: '',
            batch: ''
        }
    });
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        fetchDepartments();
        fetchBatches();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/departments');
            setDepartments(response.data.departments);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const fetchBatches = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/batches');
            setBatches(response.data.batches);
        } catch (error) {
            console.error('Error fetching batches:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'department' || name === 'batch') {
            setFormData((prevData) => ({
                ...prevData,
                details: {
                    ...prevData.details,
                    [name]: value
                }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProfileImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            role: '',
            profileImage: '',
            details: {
                department: '',
                batch: ''
            }
        });
        setProfileImage(null);
        setPreviewImage(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (profileImage) {
            formData.profileImage = profileImage;
        }

        try {
            console.log("FormData before submission:", formData);
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const response = await axios.post('http://localhost:3000/api/users', formData, config);
            setMessage(response.data.message);
            resetForm();
            setTimeout(() => {
                setMessage('');
            }, 5000);

        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create user');
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: 2 }}>
            {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="profile-image-file"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="profile-image-file">
                        <Box
                            sx={{
                                display: previewImage ? 'none' : 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                fontSize: 80
                            }}
                        >
                            <AccountCircleIcon sx={{ fontSize: 80 }} />
                        </Box>
                    </label>
                    {previewImage && (
                        <ImagePreview>
                            <img src={previewImage} alt="Profile preview" style={{ width: '100%', height: '100%' }} />
                            <label htmlFor="profile-image-file">
                                <OverlayIconButton component="span" aria-label="change picture">
                                    <PhotoCamera />
                                </OverlayIconButton>
                            </label>
                        </ImagePreview>
                    )}
                </Box>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    variant="outlined"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    variant="outlined"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    variant="outlined"
                    name="password"
                    required
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Role</FormLabel>
                    <RadioGroup
                        aria-label="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="Student" control={<Radio />} label="Student" />
                        <FormControlLabel value="Lecturer" control={<Radio />} label="Lecturer" />
                        <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                        <FormControlLabel value="Non-Academic" control={<Radio />} label="Non-Academic" />
                    </RadioGroup>
                </FormControl>

                {formData.role === 'Student' && (
    <>
        {/* Dropdown for Department */}
        <FormControl fullWidth margin="normal">
            <InputLabel id="department-group-label">Department Group</InputLabel>
            <Select
                labelId="department-group-label"
                id="department-group"
                name="department"
                required
                value={formData.details.department}
                onChange={handleChange}
                label="Department Group"
            >
                {departments.map((department) => (
                    <MenuItem key={department._id} value={department._id}>
                        {department.department}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        {/* Dropdown for Batch */}
        <FormControl fullWidth margin="normal">
            <InputLabel id="batch-group-label">Batch Group</InputLabel>
            <Select
                labelId="batch-group-label"
                id="batch-group"
                name="batch"
                required
                value={formData.details.batch}
                onChange={handleChange}
                label="Batch Group"
            >
                {batches.map((batch) => (
                    <MenuItem key={batch._id} value={batch._id}>
                        {batch.batch}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </>
)}


                <Box sx={{ alignSelf: 'flex-end', width: '100%' }}>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default RegisterUserForm;
