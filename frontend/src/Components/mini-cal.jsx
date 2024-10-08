import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const Schedule = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/schedules');
            const schedules = response.data?.data?.map(schedule => ({
                ...schedule,
                start: new Date(schedule.startTime),
                end: new Date(schedule.endTime),
                title: `${schedule.scheduleStatus} - ${schedule.batch?.batch || ''} - ${schedule.department?.department || ''} - ${schedule.lectureHallId?.name || 'N/A'}`
            }));
            setEvents(schedules);
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    };

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
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: 10,
                paddingRight: 50,
                boxSizing: 'border-box',
                position: 'absolute', // Keep the element positioned absolutely
                bottom: 20, // Position it at the bottom of the page
                right: 20, // Position it on the right side
                width: 'auto', // Set width to auto to avoid stretching
            }}
        >
            <div style={{ flex: '1' }}>
                {/* Other content can go here */}
            </div>
            <div style={{ width: '400px', height: '400px' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%', width: '100%' }}
                    eventPropGetter={eventStyleGetter}
                />
            </div>
        </div>
    );
};

export default Schedule;
