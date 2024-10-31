import React, { useState, useEffect } from 'react';
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
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Mini from '../Components/mini-cal';
import axios from 'axios';

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function HallAttendant({ userDetails, onLogout }) {
  const currentDate = new Date();
  const currentDayIndex = (currentDate.getDay() + 6) % 7;

  const [dayIndex, setDayIndex] = useState(currentDayIndex);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/schedules');
        const filteredData = response.data?.data
          ?.filter(schedule => new Date(schedule.date).getDay() === (dayIndex + 1) % 7)
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
        setSchedules(filteredData);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchScheduleData();
  }, [dayIndex]);

  const handleNextDay = () => {
    setDayIndex((prevIndex) => (prevIndex + 1) % weekdays.length);
  };

  const handlePreviousDay = () => {
    setDayIndex((prevIndex) => (prevIndex - 1 + weekdays.length) % weekdays.length);
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar onLogout={onLogout} />
      <ProfileAndDateTime userDetails={userDetails} />

      <div style={{ padding: '16px' }}>
        <Typography variant="h4" sx={{ marginBottom: '16px' }}>
          Welcome, {userDetails.name}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '32px' }}>
          You are logged in as a Hall Attendant.
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
            <Typography variant="h6">{weekdays[dayIndex]}</Typography>
            <Button variant="outlined" onClick={handleNextDay} endIcon={<ArrowForward />}></Button>
          </Stack>

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
                {schedules.map((schedule, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(schedule.date).toLocaleDateString()}</TableCell>
                    <TableCell>{schedule.subjectName}</TableCell>
                    <TableCell>{`${new Date(schedule.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(schedule.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</TableCell>
                    <TableCell>{schedule.lectureHallId}</TableCell>
                    <TableCell style={{ color: getStatusColor(schedule.scheduleStatus) }}>{schedule.scheduleStatus}</TableCell>
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

export default HallAttendant;
