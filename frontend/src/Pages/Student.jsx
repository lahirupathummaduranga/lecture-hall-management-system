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

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function Student({ userDetails, onLogout }) {
  // Calculate the current day index
  const currentDate = new Date();
  const currentDayIndex = (currentDate.getDay() + 6) % 7; // Adjust for Monday start

  const [selectedDayIndex, setSelectedDayIndex] = useState(currentDayIndex);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/schedules');
        const filteredData = response.data?.data
          ?.filter(schedule => new Date(schedule.date).getDay() === (selectedDayIndex + 1) % 7)
          .map(schedule => ({
            subjectName: schedule.subjectName,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            lectureHallId: schedule.lectureHallId?.name || 'N/A',
          }));
        setSubjects(filteredData);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchScheduleData();
  }, [selectedDayIndex]);

  const handleNextDay = () => {
    setSelectedDayIndex((prevIndex) => (prevIndex + 1) % weekdays.length);
  };

  const handlePreviousDay = () => {
    setSelectedDayIndex((prevIndex) => (prevIndex - 1 + weekdays.length) % weekdays.length);
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
            <Button variant="outlined" onClick={handlePreviousDay} startIcon={<ArrowBack />}></Button>
            <Typography variant="h6">{weekdays[selectedDayIndex]}</Typography>
            <Button variant="outlined" onClick={handleNextDay} endIcon={<ArrowForward />}></Button>
          </Stack>

          <TableContainer component={Paper} sx={{ marginTop: '16px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Venue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subjects.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell>{subject.subjectName}</TableCell>
                    <TableCell>{`${new Date(subject.startTime).toLocaleTimeString()} - ${new Date(subject.endTime).toLocaleTimeString()}`}</TableCell>
                    <TableCell>{subject.lectureHallId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>

      <Mini />
      <Footer />
    </div>
  );
}

export default Student;
