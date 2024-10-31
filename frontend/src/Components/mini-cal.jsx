import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);


const CustomToolbar = ({ date, onNavigate }) => {
    const monthYear = moment(date).format('MMMM YYYY');

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', marginTop:'8px' }}>
            <button onClick={() => onNavigate('PREV')} style={buttonStyle}>&#9664; </button>
            <span style={{ margin: '0 15px', fontWeight: 'bold', fontSize: '1.15em' }}>{monthYear}</span>
            <button onClick={() => onNavigate('NEXT')} style={buttonStyle}>&#9654;</button>
        </div>
    );
};

const buttonStyle = {
    padding: '6px 12px',
    backgroundColor: '#131862',
    color: '#fff',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s',
    fontSize: '0.9em', // Reduced font size
};

const BasicCalendar = () => {
    const events = []; // Empty events array

    const handleEventClick = (event) => {
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDate(event.start)}/${formatDate(event.end)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
        window.open(googleCalendarUrl, '_blank');
    };

    const formatDate = (date) => date.toISOString().replace(/-|:|\.\d+/g, '');

    return (
        <div style={{
            width: '400px', // Reduced width
            height: '300px', // Reduced height
            position: 'absolute',
            top: '280px',
            right: '100px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            borderRadius: '5px',
            overflow: 'hidden',
            backgroundColor: '#B0D4F8',
            border: '3px solid black', // Added black border
        }}>
            <Calendar
                localizer={localizer}
                events={events} // No events to display
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%', width: '100%', borderRadius: '20px' }}
                views={['month']}
                defaultView="month"
                components={{ toolbar: CustomToolbar }}
                onSelectEvent={handleEventClick} // No events to select
            />
        </div>
    );
};

export default BasicCalendar;

