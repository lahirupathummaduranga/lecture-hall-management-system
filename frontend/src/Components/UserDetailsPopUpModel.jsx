import React from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function UserDetailsPopUpModel({ open, handleClose, selectedUser, setSelectedUser, handleUpdate, handleDelete, departments, batches }) {
    const handleDepartmentChange = (event) => {
        setSelectedUser({ ...selectedUser, roleRef: { ...selectedUser.roleRef, department: event.target.value } });
    };

    const handleBatchChange = (event) => {
        setSelectedUser({ ...selectedUser, roleRef: { ...selectedUser.roleRef, batch: event.target.value } });
    };

    const handleFieldChange = (field, value) => {
        setSelectedUser({ ...selectedUser, [field]: value });
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    User Details
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TextField fullWidth margin="dense" value={selectedUser.name} onChange={(e) => handleFieldChange('name', e.target.value)} />
                    <TextField fullWidth margin="dense" value={selectedUser.email} onChange={(e) => handleFieldChange('email', e.target.value)} />
                    <TextField fullWidth margin="dense" type="password" placeholder="New Password" onChange={(e) => handleFieldChange('password', e.target.value)} />
                </Typography>
                {selectedUser.role === 'Student' && (
                    <>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="department-label">Department</InputLabel>
                            <Select
                                labelId="department-label"
                                id="department-select"
                                value={selectedUser.roleRef?.department || ''}
                                onChange={handleDepartmentChange}
                                label="Department"
                            >
                                {departments.map((dept) => (
                                    <MenuItem key={dept._id} value={dept._id}>{dept.department}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="batch-label">Batch</InputLabel>
                            <Select
                                labelId="batch-label"
                                id="batch-select"
                                value={selectedUser.roleRef?.batch || ''}
                                onChange={handleBatchChange}
                                label="Batch"
                            >
                                {batches.map((batch) => (
                                    <MenuItem key={batch._id} value={batch._id}>{batch.batch}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </>
                )}
                <Button onClick={handleUpdate} color="primary" variant="contained" sx={{ mt: 2, mr: 1 }}>Update</Button>
                <Button onClick={handleDelete} color="secondary" variant="contained" sx={{ mt: 2 }}>Delete</Button>
            </Box>
        </Modal>
    );
}

export default UserDetailsPopUpModel;
