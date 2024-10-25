import React, { useState, useEffect } from 'react';
import NavBar from '../Components/Header/NavBar';
import ProfileAndDateTime from '../Components/ProfileAndDateTime/ProfileAndDateTime';
import Footer from '../Components/Footer/MainFooterComponent';
import { Box, Button, IconButton, Typography, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Mini from '../Components/mini-cal';

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function Student({ userDetails, onLogout }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Set initial day based on the current day of the week
  const getCurrentDayIndex = () => {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    // Map Sunday (0) and Saturday (6) to Monday (index 0) if needed
    return today >= 1 && today <= 5 ? today - 1 : 0; // Map Monday-Friday to 0-4
  };

  const [currentDayIndex, setCurrentDayIndex] = useState(getCurrentDayIndex);

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
        return "Details for Task 1: Submit the assignment by 5 PM.";
      case 2:
        return "Details for Task 2: Attend the group study session at 3 PM.";
      case 3:
        return "Details for Task 3: Complete the online quiz before midnight.";
      case 4:
        return "Details for Task 4: Review lecture notes for tomorrow's class.";
      default:
        return "No details available.";
    }
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prevIndex) => (prevIndex + 1) % weekdays.length); // Loop between Monday to Friday
  };

  const handlePreviousDay = () => {
    setCurrentDayIndex((prevIndex) => (prevIndex - 1 + weekdays.length) % weekdays.length); // Loop back from Monday to Friday
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar onLogout={onLogout} />
      <ProfileAndDateTime userDetails={userDetails} />

      <div style={{ padding: '16px' }}>
        <Typography variant="h4" sx={{ marginBottom: '16px' }}>
          Welcome, {userDetails.name}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '32px' }}>
          You are logged in as a Student.
        </Typography>
      </div>

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
            <IconButton onClick={handlePreviousDay}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">{weekdays[currentDayIndex]}</Typography>
            <IconButton onClick={handleNextDay}>
              <ArrowForwardIcon />
            </IconButton>
          </Stack>

          <Stack spacing={2} sx={{ marginTop: '16px' }}>
            {[1, 2, 3, 4].map((item) => (
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
                      backgroundColor: '#42a5f5',
                      transform: 'scale(1.05)',
                    },
                    transition: 'background-color 0.3s, transform 0.3s',
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

      <Footer />

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

export default Student;
