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
        hour12: false
    });

    const dateString = currentTime.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, ' - ');

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
