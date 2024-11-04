import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel, Alert, Box, IconButton } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

const localizer = momentLocalizer(moment);

const Schedule = () => {
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({
        subjectName: '',
        date: '',
        startTime: '',
        endTime: '',
        lecturerId: '',
        scheduleStatus: 'Scheduled',
        batch: '',
        department: '',
        lectureHallId: ''
    });
    const [departments, setDepartments] = useState([]);
    const [batches, setBatches] = useState([]);
    const [lectureHalls, setLectureHalls] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchSchedules();
        fetchDepartments();
        fetchBatches();
        fetchLectureHalls();
        fetchLecturers();
    }, []);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/schedules');
            const schedules = response.data?.data?.map(schedule => ({
                ...schedule,
                start: new Date(schedule.startTime),
                end: new Date(schedule.endTime),
                title: `${schedule.subjectName || 'No Subject'} - ${schedule.scheduleStatus} - ${schedule.batch?.batch || ''} - ${schedule.department?.department || ''} - ${schedule.lectureHallId?.name || 'N/A'}`
            }));
            setEvents(schedules);
        } catch (error) {
            console.error('Error fetching schedules:', error);
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

    const fetchLectureHalls = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/lecturehalls');
            setLectureHalls(response.data.lectureHalls);
        } catch (error) {
            console.error('Error fetching lecture halls:', error);
        }
    };

    const fetchLecturers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/lecturers');
            setLecturers(response.data);
        } catch (error) {
            console.error('Error fetching lecturers:', error);
        }
    };

    const handleSelectSlot = ({ start, end }) => {
        setFormData({
            ...formData,
            date: moment(start).format('YYYY-MM-DD'),
            startTime: moment(start).format('HH:mm'),
            endTime: moment(end).format('HH:mm')
        });
        setSelectedEvent(null);
        setErrorMessage('');
        setOpen(true);
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setFormData({
            subjectName: event.subjectName || '',
            date: moment(event.date).format('YYYY-MM-DD'),
            startTime: moment(event.startTime).format('HH:mm'),
            endTime: moment(event.endTime).format('HH:mm'),
            lecturerId: event.lecturerId?._id || '',
            scheduleStatus: event.scheduleStatus,
            batch: event.batch?._id || '',
            department: event.department?._id || '',
            lectureHallId: event.lectureHallId?._id || ''
        });
        setErrorMessage('');
        setOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const selectedDate = new Date(formData.date);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            if (selectedDate < currentDate) {
                setErrorMessage('Cannot select a past date.');
                return;
            }

            if (selectedEvent) {
                await axios.put(`http://localhost:3000/api/schedules/${selectedEvent._id}`, formData);
            } else {
                await axios.post('http://localhost:3000/api/schedules', formData);
            }
            fetchSchedules();
            setOpen(false);
        } catch (error) {
            console.error('Error saving schedule:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Failed to save the schedule.');
            }
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/schedules/${selectedEvent._id}`);
            fetchSchedules();
            setOpen(false);
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedEvent(null);
        setFormData({
            subjectName: '',
            date: '',
            startTime: '',
            endTime: '',
            lecturerId: '',
            scheduleStatus: 'Scheduled',
            batch: '',
            department: '',
            lectureHallId: ''
        });
        setErrorMessage('');
    };

    const handleOpenRegister = () => {
        setOpen(true);
    };
    const isCancelled = selectedEvent && selectedEvent.scheduleStatus === 'Cancelled';

    const eventStyleGetter = (event) => {
        let backgroundColor = '';
        let borderColor = '';
        switch (event.scheduleStatus) {
            case 'Scheduled':
                backgroundColor = '#90caf9';
                borderColor = '#64b5f6';
                break;
            case 'Completed':
                backgroundColor = '#81c784';
                borderColor = '#66bb6a';
                break;
            case 'Cancelled':
                backgroundColor = '#e57373';
                borderColor = '#f44336';
                break;
            case 'Postponed':
                backgroundColor = '#ffb74d';
                borderColor = '#ffa726';
                break;
            default:
                backgroundColor = '#90caf9';
                borderColor = '#64b5f6';
        }
        return {
            style: {
                backgroundColor,
                borderColor,
                borderWidth: '1px',
                borderStyle: 'solid',
                color: 'white'
            }
        };
    };

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <IconButton color="primary" onClick={handleOpenRegister}>
                    <LibraryAddIcon />
                </IconButton>
            </Box>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventStyleGetter}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedEvent ? 'Update Schedule' : 'Create Schedule'}</DialogTitle>
                <DialogContent>
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                    <TextField
                        margin="dense"
                        name="subjectName"
                        label="Subject Name"
                        type="text"
                        fullWidth
                        value={formData.subjectName}
                        onChange={handleChange}
                        disabled={isCancelled}
                    />
                    <TextField
                        margin="dense"
                        name="date"
                        label="Date"
                        type="date"
                        fullWidth
                        value={formData.date}
                        onChange={handleChange}
                        disabled={isCancelled}
                        InputProps={{
                            inputProps: {
                                min: moment().format('YYYY-MM-DD')
                            }
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="startTime"
                        label="Start Time"
                        type="time"
                        fullWidth
                        value={formData.startTime}
                        onChange={handleChange}
                        disabled={isCancelled}
                    />
                    <TextField
                        margin="dense"
                        name="endTime"
                        label="End Time"
                        type="time"
                        fullWidth
                        value={formData.endTime}
                        onChange={handleChange}
                        disabled={isCancelled}
                    />
                    <FormControl fullWidth margin="dense" disabled={isCancelled}>
                        <InputLabel id="lecturer-label">Lecturer</InputLabel>
                        <Select
                            labelId="lecturer-label"
                            name="lecturerId"
                            value={formData.lecturerId}
                            onChange={handleChange}
                        >
                            {lecturers.map((lecturer) => (
                                <MenuItem key={lecturer._id} value={lecturer._id}>
                                    {lecturer.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense" disabled={isCancelled}>
                        <InputLabel id="batch-label">Batch</InputLabel>
                        <Select
                            labelId="batch-label"
                            name="batch"
                            value={formData.batch}
                            onChange={handleChange}
                        >
                            {batches.map((batch) => (
                                <MenuItem key={batch._id} value={batch._id}>
                                    {batch.batch}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense" disabled={isCancelled}>
                        <InputLabel id="department-label">Department</InputLabel>
                        <Select
                            labelId="department-label"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        >
                            {departments.map((department) => (
                                <MenuItem key={department._id} value={department._id}>
                                    {department.department}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense" disabled={isCancelled}>
                        <InputLabel id="lectureHallId-label">Lecture Hall</InputLabel>
                        <Select
                            labelId="lectureHallId-label"
                            name="lectureHallId"
                            value={formData.lectureHallId}
                            onChange={handleChange}
                        >
                            {lectureHalls.map((lectureHall) => (
                                <MenuItem key={lectureHall._id} value={lectureHall._id}>
                                    {lectureHall.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense" disabled={isCancelled}>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            name="scheduleStatus"
                            value={formData.scheduleStatus}
                            onChange={handleChange}
                        >
                            <MenuItem value="Scheduled">Scheduled</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                            <MenuItem value="Postponed">Postponed</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    {selectedEvent && (
                        <Button onClick={handleDelete} color="error" >
                            Delete
                        </Button>               
                    )}
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} color="primary" disabled={isCancelled}>
                        {selectedEvent ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Schedule;
