import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CustomToolbar = (toolbar) => {
    const goToBack = () => {
        toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
        toolbar.onNavigate('NEXT');
    };

    const goToToday = () => {
        toolbar.onNavigate('TODAY');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
            <button onClick={goToBack} style={buttonStyle}>
                &#9664; Back
            </button>
            <button onClick={goToToday} style={{ ...buttonStyle, margin: '0 10px' }}>
                Today
            </button>
            <button onClick={goToNext} style={buttonStyle}>
                Next &#9654;
            </button>
        </div>
    );
};

const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#90caf9',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s',
};

const BasicCalendar = () => {
    return (
        <div
            style={{
                width: '400px',
                height: '400px',
                position: 'absolute',
                top: '320px',
                right: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                overflow: 'hidden',
            }}
        >
            <Calendar
                localizer={localizer}
                events={[]}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%', width: '100%' }}
                views={['month']}
                components={{ toolbar: CustomToolbar }}
            />
        </div>
    );
};

export default BasicCalendar;
