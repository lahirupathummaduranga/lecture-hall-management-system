import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const CurrentTimeDisplay = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const timeString = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const dateString = currentTime.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <Box>
            <Typography variant="subtitle1" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                {timeString}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                {dateString}
            </Typography>
        </Box>
    );
};

export default CurrentTimeDisplay;
