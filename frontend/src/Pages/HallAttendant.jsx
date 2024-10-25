import React, { useState, useEffect } from 'react';
import NavBar from '../Components/Header/NavBar';
import ProfileAndDateTime from '../Components/ProfileAndDateTime/ProfileAndDateTime';
import Footer from '../Components/Footer/MainFooterComponent';
import {
  Box, Button, IconButton, Typography, Stack, Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Mini from '../Components/mini-cal';

function HallAttendant({ userDetails, onLogout }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openIssuesDialog, setOpenIssuesDialog] = useState(false); 
  const [issues, setIssues] = useState([]); // State to store fetched issues

  // Fetch issues from the backend
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/issues'); // Adjust API endpoint as needed
        const data = await response.json();
        setIssues(data); // Store fetched issues
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []); // Fetch once when the component mounts

  const handleClickOpen = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleViewIssues = () => {
    setOpenIssuesDialog(true); // Open the issues dialog
  };

  const handleCloseIssues = () => {
    setOpenIssuesDialog(false); // Close the issues dialog
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar onLogout={onLogout} />
      <ProfileAndDateTime userDetails={userDetails} />

      <div style={{ padding: '16px' }}>
        <h1>Welcome, {userDetails.name}</h1>
        <p>You are logged in as a Hall Attendant.</p>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', padding: '16px', marginTop: 'auto' }}>
        <Box sx={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px', width: '100%', maxWidth: '800px', backgroundColor: '#f9f9f9' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">Today</Typography>
            <IconButton>
              <ArrowForwardIcon />
            </IconButton>
          </Stack>

          <Stack spacing={2} sx={{ marginTop: '16px' }}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Stack key={item} direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#e3f2fd', padding: '8px 16px', borderRadius: '4px' }}>
                <Typography variant="body1">Task {item}</Typography>
                <Button variant="contained" sx={{ backgroundColor: '#64b5f6', '&:hover': { backgroundColor: '#42a5f5', transform: 'scale(1.05)' }, transition: 'background-color 0.3s, transform 0.3s' }} onClick={() => handleClickOpen(item)}>
                  View
                </Button>
              </Stack>
            ))}
          </Stack>
        </Box>
      </div>

      <Mini />

      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
        <Button variant="contained" sx={{ backgroundColor: '#64b5f6', textTransform: 'none', '&:hover': { backgroundColor: '#42a5f5', transform: 'scale(1.05)' }, transition: 'background-color 0.3s, transform 0.3s' }} onClick={handleViewIssues}>
          View Issues
        </Button>
      </div>

      <Footer />

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{selectedTask !== null ? `Details for Task ${selectedTask}` : "No task selected."}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openIssuesDialog} onClose={handleCloseIssues} maxWidth="md" fullWidth>
        <DialogTitle>Issues</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Issue</TableCell>
                <TableCell>Lecture Hall</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>{issue.issueDescription}</TableCell>
                  <TableCell>{issue.lectureHall}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseIssues} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HallAttendant;
