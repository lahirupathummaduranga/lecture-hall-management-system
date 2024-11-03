import React, { useState, useEffect } from 'react';
import NavBar from '../Components/Header/NavBar';
import ProfileAndDateTime from '../Components/ProfileAndDateTime/ProfileAndDateTime';
import Footer from '../Components/Footer/MainFooterComponent';
import {
    Box,
    Button,
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
    TableContainer,
    Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Mini from '../Components/mini-cal';
import axios from 'axios';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function HallAttendant({ userDetails, onLogout }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [openIssuesDialog, setOpenIssuesDialog] = useState(false);
    const [issues, setIssues] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);

    const currentDate = new Date();
    const currentDayIndex = (currentDate.getDay() + 6) % 7;
    const [dayIndex, setDayIndex] = useState(currentDayIndex);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/issues');
                setIssues(response.data);
                setNotificationCount(response.data.length);
            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        };

        fetchIssues();
    }, []);

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

                // Sort by start time
                filteredData.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

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
        setOpenIssuesDialog(true);
    };

    const handleCloseIssues = () => {
        setOpenIssuesDialog(false);
    };

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
        } else if (hour < 15) {
            return `Good afternoon, ${userDetails.name}!`;
        } else {
            return `Good evening, ${userDetails.name}!`;
        }
    };

    const handleMarkAsComplete = async (issueId) => {
        try {
            await axios.delete(`http://localhost:3000/api/issues/${issueId}`);
            setIssues((prevIssues) => prevIssues.filter((issue) => issue._id !== issueId));
            setNotificationCount((prevCount) => prevCount - 1);
        } catch (error) {
            console.error('Error marking issue as complete:', error);
        }
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
            <NavBar onLogout={onLogout} notificationCount={notificationCount} />
            <ProfileAndDateTime userDetails={userDetails} />

            <div style={{ padding: '16px' }}>
                <Typography variant="h5" sx={{ marginBottom: '16px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                    {getGreeting()}
                </Typography>
            </div>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', padding: '16px', marginTop: 'auto' }}>
                <Box sx={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px', width: '100%', maxWidth: '800px', backgroundColor: '#f9f9f9' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Button variant="outlined" onClick={handlePreviousDay} startIcon={<ArrowBackIcon />} />
                        <Typography variant="h6">{weekdays[dayIndex]}</Typography>
                        <Button variant="outlined" onClick={handleNextDay} endIcon={<ArrowForwardIcon />} />
                    </Stack>
                    <Mini date={new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())} />
                    <TableContainer component={Paper} sx={{ marginTop: '16px' }}>
                        {schedules.length === 0 ? (
                            <Typography variant="h6" sx={{ padding: '16px', color: 'gray', textAlign: 'center' }}>
                                No lectures today
                            </Typography>
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Subject</TableCell>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Lecture Hall</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {schedules.map((schedule, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{new Date(schedule.date).toLocaleDateString()}</TableCell>
                                            <TableCell>{schedule.subjectName}</TableCell>
                                            <TableCell>{`${new Date(schedule.startTime).toLocaleTimeString()} - ${new Date(schedule.endTime).toLocaleTimeString()}`}</TableCell>
                                            <TableCell>{schedule.lectureHallId}</TableCell>
                                            <TableCell style={{ color: getStatusColor(schedule.scheduleStatus) }}>{schedule.scheduleStatus}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </TableContainer>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '20px' }}>
                        <Button variant="contained" sx={{ backgroundColor: '#90caf9', textTransform: 'none', '&:hover': { backgroundColor: '#42a5f5', transform: 'scale(1.05)' }, transition: 'background-color 0.3s, transform 0.3s' }} onClick={handleViewIssues}>
                            View Issues
                        </Button>
                    </div>
                </Box>

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
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {issues.map((issue) => (
                                    <TableRow key={issue._id}>
                                        <TableCell>{issue.issueDescription}</TableCell>
                                        <TableCell>{issue.lectureHall}</TableCell>
                                        <TableCell>
                                        <Button variant="outlined" sx={{ color: 'white', borderColor: '#42a5f5', backgroundColor: '#001f3f', '&:hover': { backgroundColor: '#003366' } }} onClick={() => handleMarkAsComplete(issue._id)}>
                                                Mark as Complete
                                            </Button>
                                        </TableCell>
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

            <Footer />
        </div>
    );
}

export default HallAttendant;
