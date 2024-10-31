import React, { useState, useEffect } from 'react';
import NavBar from '../Components/Header/NavBar';
import ProfileAndDateTime from '../Components/ProfileAndDateTime/ProfileAndDateTime';
import Footer from '../Components/Footer/MainFooterComponent';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Mini from '../Components/mini-cal';
import axios from 'axios';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function HallAttendant({ userDetails, onLogout }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openIssuesDialog, setOpenIssuesDialog] = useState(false);
  const [issues, setIssues] = useState([]); // State to store fetched issues
  const [schedules, setSchedules] = useState([]); // State to store fetched schedules

  // Calculate the current day index
  const currentDate = new Date();
  const currentDayIndex = (currentDate.getDay() + 6) % 7; // Adjust for Monday start
  const [dayIndex, setDayIndex] = useState(currentDayIndex); // Use state for day index

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

  // Fetch schedules based on the current day
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/schedules');
        const filteredData = response.data?.data
          ?.filter(schedule => new Date(schedule.date).getDay() === (dayIndex + 1) % 7)
          .map(schedule => ({
            subjectName: schedule.subjectName,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            lectureHallId: schedule.lectureHallId?.name || 'N/A',
          }));
        setSchedules(filteredData);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchScheduleData();
  }, [dayIndex]);

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

  // Handlers for Next and Previous buttons
  const handleNextDay = () => {
    setDayIndex((prevIndex) => (prevIndex + 1) % weekdays.length);
  };

  const handlePreviousDay = () => {
    setDayIndex((prevIndex) => (prevIndex - 1 + weekdays.length) % weekdays.length);
  };

  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) {
      return `Good morning, ${userDetails.name}!`;
    } else if (hour < 18) {
      return `Good afternoon, ${userDetails.name}!`;
    } else {
      return `Good evening, ${userDetails.name}!`;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar onLogout={onLogout} />
      <ProfileAndDateTime userDetails={userDetails} />

      <div style={{ padding: '16px' }}>
      <Typography variant="h5" sx={{ marginBottom: '16px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
          {getGreeting()}
      </Typography>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', padding: '16px', marginTop: 'auto' }}>
        <Box sx={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px', width: '100%', maxWidth: '800px', backgroundColor: '#f9f9f9' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Button variant="outlined" onClick={handlePreviousDay} startIcon={<ArrowBackIcon />}></Button>
            <Typography variant="h6">{weekdays[dayIndex]}</Typography>
            <Button variant="outlined" onClick={handleNextDay} endIcon={<ArrowForwardIcon />}></Button>
          </Stack>

          <Table sx={{ marginTop: '16px' }}>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Venue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell>{schedule.subjectName}</TableCell>
                  <TableCell>{`${new Date(schedule.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(schedule.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</TableCell>
                  <TableCell>{schedule.lectureHallId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </div>

      <Mini />

      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
        <Button variant="contained" sx={{ backgroundColor: '#90caf9', textTransform: 'none', '&:hover': { backgroundColor: '#42a5f5', transform: 'scale(1.05)' }, transition: 'background-color 0.3s, transform 0.3s' }} onClick={handleViewIssues}>
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
                <TableRow key={issue.id || issue.issueDescription}>
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

