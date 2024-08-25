import React, { useState } from 'react';
import NavBar from '../Components/Header/NavBar';
import ProfileAndDateTime from '../Components/ProfileAndDateTime/ProfileAndDateTime';
import Footer from '../Components/Footer/MainFooterComponent';
import { Box, Button, IconButton, Typography, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Mini from '../Components/mini-cal';

function HallAttendant({ userDetails, onLogout }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleClickOpen = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const renderTaskDetails = (task) => {
    switch (task) {
      case 1:
        return "Details for Task 1: Set up the lecture hall before 8 AM.";
      case 2:
        return "Details for Task 2: Assist with the audio-visual equipment during the seminar.";
      case 3:
        return "Details for Task 3: Ensure all projectors are working correctly before the event.";
      case 4:
        return "Details for Task 4: Prepare refreshments for the guest speakers.";
      case 5:
        return "Details for Task 5: Clean up and reset the hall after the conference.";
      default:
        return "No details available.";
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar onLogout={onLogout} />
      <ProfileAndDateTime userDetails={userDetails} />

      {/* Welcome message */}
      <div style={{ padding: '16px' }}>
        <h1>Welcome, {userDetails.name}</h1>
        <p>You are logged in as a Hall Attendant.</p>
      </div>

      {/* Main Content Box moved to the bottom */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', padding: '16px', marginTop: 'auto' }}>
        <Box
          sx={{
            padding: '16px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '800px',
            backgroundColor: '#f9f9f9',
          }}
        >
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
            {/* List items with View buttons */}
            {[1, 2, 3, 4, 5].map((item) => (
              <Stack
                key={item}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  backgroundColor: '#e3f2fd',
                  padding: '8px 16px',
                  borderRadius: '4px',
                }}
              >
                <Typography variant="body1">Task {item}</Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#64b5f6',
                    '&:hover': {
                      backgroundColor: '#42a5f5', // Color on hover
                      transform: 'scale(1.05)', // Scale effect on hover
                    },
                    transition: 'background-color 0.3s, transform 0.3s', // Smooth transition
                  }}
                  onClick={() => handleClickOpen(item)}
                >
                  View
                </Button>
              </Stack>
            ))}
          </Stack>
        </Box>
      </div>

      <Mini />

      {/* View Issues Button at the Top-Right Corner */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px'}}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#64b5f6',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#42a5f5', // Color on hover
              transform: 'scale(1.05)', // Scale effect on hover
            },
            transition: 'background-color 0.3s, transform 0.3s', // Smooth transition
          }}
        >
          View Issues
        </Button>
      </div>

      <Footer />

      {/* Dialog for Task Details */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {selectedTask !== null ? renderTaskDetails(selectedTask) : "No task selected."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HallAttendant;
