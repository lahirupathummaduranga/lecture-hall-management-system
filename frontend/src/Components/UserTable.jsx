import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Pagination, Stack, FormControl, InputLabel, Select, MenuItem, Box, TextField, Alert, IconButton
} from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import UserDetailsPopUpModel from './UserDetailsPopUpModel';
import RegistrationPopUpModel from './RegistrationPopUpModel/RegistrationPopUpModel';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [batch, setBatch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  useEffect(() => {
    fetchDepartments();
    fetchBatches();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [page, role, department, batch]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users', {
        params: {
          page,
          limit: 5,
          role,
          department,
          batch
        },
      });
      setUsers(response.data.docs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleBatchChange = (event) => {
    setBatch(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  const handleUpdate = async () => {
    try {
      const updatePayload = { ...selectedUser };
      if (selectedUser.role === 'Student') {
        updatePayload.details = {
          department: selectedUser.roleRef.department,
          batch: selectedUser.roleRef.batch,
        };
      }
      const response = await axios.put(`http://localhost:3000/api/users/${selectedUser._id}`, updatePayload);
      fetchUsers();
      handleClose();
      setAlertMessage('Update successful!');
      setAlertSeverity('success');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } catch (error) {
      setAlertMessage('Error updating user!');
      setAlertSeverity('error');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/users/${selectedUser._id}`);
      setAlertMessage(response.data.message);
      setAlertSeverity('success');
      setShowAlert(true);
      fetchUsers();
      handleClose();
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } catch (error) {
      console.error('Error deleting user:', error);
      setAlertMessage('Error deleting user!');
      setAlertSeverity('error');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  const getDepartmentName = (deptId) => {
    const dept = departments.find((d) => d._id === deptId);
    return dept ? dept.department : 'N/A';
  };

  const getBatchName = (batchId) => {
    const batch = batches.find((b) => b._id === batchId);
    return batch ? batch.batch : 'N/A';
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {showAlert && (
        <Alert severity="success" onClose={() => setShowAlert(false)} sx={{ width: '100%', mb: 2 }}>
          {alertMessage}
        </Alert>
      )}
      <Box sx={{ minWidth: 120, marginBottom: 2, display: 'flex', justifyContent: 'space-between', gap: '20px' }}>

        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            sx={{ height: '40px', borderRadius: '25px' }}
            labelId="role-label"
            id="role-select"
            value={role}
            label="Role"
            onChange={handleRoleChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Lecturer">Lecturer</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Non-Academic">Non-Academic</MenuItem>
          </Select>
        </FormControl>
        {role === 'Student' && (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel id="department-label">Department</InputLabel>
              <Select
                sx={{ height: '40px', borderRadius: '25px' }}
                labelId="department-label"
                id="department-select"
                value={department}
                onChange={handleDepartmentChange}
                label="Department"
              >
                <MenuItem value="">All</MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept._id} value={dept._id}>
                    {dept.department}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="batch-label">Batch</InputLabel>
              <Select
                sx={{ height: '40px', borderRadius: '25px', width: '100px' }}
                labelId="batch-label"
                id="batch-select"
                value={batch}
                onChange={handleBatchChange}
                label="Batch"
              >
                <MenuItem value="">All</MenuItem>
                {batches.map((b) => (
                  <MenuItem key={b._id} value={b._id}>
                    {b.batch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              height: '40px',
              width: '200px',
              borderRadius: '25px',
              '& input': {
                padding: '1px 14px',
              },
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <IconButton color="primary" onClick={handleOpenRegister}>
          <LibraryAddIcon />
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#131842' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }} align="right">Role</TableCell>
              <TableCell sx={{ color: 'white' }} align="right">Email</TableCell>
              <TableCell sx={{ color: 'white' }} align="right">Department</TableCell>
              <TableCell sx={{ color: 'white' }} align="right">Batch</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user._id}
                onClick={() => handleRowClick(user)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.role}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">
                  {user.roleRef?.department ? getDepartmentName(user.roleRef.department) : 'N/A'}
                </TableCell>
                <TableCell align="right">
                  {user.roleRef?.batch ? getBatchName(user.roleRef.batch) : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} sx={{ marginTop: '20px', justifyContent: 'center' }}>
        <Pagination count={totalPages} color="secondary" onChange={handlePageChange} />
      </Stack>

      {selectedUser && (
        <UserDetailsPopUpModel
          open={open}
          handleClose={handleClose}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          departments={departments}
          batches={batches}
        />
      )}
      <RegistrationPopUpModel open={openRegister} handleClose={handleCloseRegister} />
    </div>
  );
};

export default UserTable;
