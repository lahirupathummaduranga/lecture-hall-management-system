import React, { useState, useEffect } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import axios from 'axios';
import NavBar from '../Components/Header/NavBar';
import ProfileAndDateTime from '../Components/ProfileAndDateTime/ProfileAndDateTime';
import Footer from '../Components/Footer/MainFooterComponent';
import {
  Box,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import Mini from '../Components/mini-cal';

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function Student({ userDetails, onLogout }) {
  const currentDate = new Date();
  const currentDayIndex = (currentDate.getDay() + 6) % 7;

  const [selectedDayIndex, setSelectedDayIndex] = useState(currentDayIndex);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/schedules');
        const filteredData = response.data?.data
          ?.filter(schedule => new Date(schedule.date).getDay() === (selectedDayIndex + 1) % 7)
          .filter(schedule => schedule.batch._id === userDetails?.roleRef?.batch)
          .map(schedule => {
            const isCompleted = new Date(schedule.endTime) < new Date();
            return {
              subjectName: schedule.subjectName,
              startTime: schedule.startTime,
              endTime: schedule.endTime,
              lectureHallId: schedule.lectureHallId?.name || 'N/A',
              scheduleStatus: isCompleted ? 'Completed' : schedule.scheduleStatus,
              date: schedule.date,
            };
          });
        setSubjects(filteredData);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchScheduleData();
  }, [selectedDayIndex, userDetails?.roleRef?.batch]);

  const handleNextDay = () => {
    setSelectedDayIndex((prevIndex) => (prevIndex + 1) % weekdays.length);
  };

  const handlePreviousDay = () => {
    setSelectedDayIndex((prevIndex) => (prevIndex - 1 + weekdays.length) % weekdays.length);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'blue';
      case 'Completed':
        return 'green';
      case 'Postponed':
        return 'orange';
      case 'Cancelled':
        return 'red';
      default:
        return 'black';
    }
  };

  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) {
      return `Good morning, ${userDetails.name}!`;
    } else if (hour < 15) {
      return `Good afternoon, ${userDetails.name}!`;
    } else {
      return `Good evening, ${userDetails.name}!`;
    }
  };

  // Determine if there are no lectures
  const noLecturesMessage = subjects.length === 0 ? "No lectures today" : null;

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
        <Box
          sx={{
            padding: '16px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '800px',
            backgroundColor: '#f9f9f9',
            height: '400px',
            overflowY: 'auto'
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Button variant="outlined" onClick={handlePreviousDay} startIcon={<ArrowBack />}></Button>
            <Typography variant="h6">{weekdays[selectedDayIndex]}</Typography>
            <Button variant="outlined" onClick={handleNextDay} endIcon={<ArrowForward />}></Button>
          </Stack>

          {noLecturesMessage ? (
            <Typography variant="h6" color="textSecondary" sx={{ marginTop: '16px', textAlign: 'center' }}>
              {noLecturesMessage}
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ marginTop: '16px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Venue</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(subject.date).toLocaleDateString()}</TableCell>
                      <TableCell>{subject.subjectName}</TableCell>
                      <TableCell>{`${new Date(subject.startTime).toLocaleTimeString()} - ${new Date(subject.endTime).toLocaleTimeString()}`}</TableCell>
                      <TableCell>{subject.lectureHallId}</TableCell>
                      <TableCell style={{ color: getStatusColor(subject.scheduleStatus) }}>{subject.scheduleStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </div>

      <Mini />
      <Footer />
    </div>
  );
}

export default Student;
