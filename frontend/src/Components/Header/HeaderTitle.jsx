import React from 'react';
import { Box, Typography } from '@mui/material';

const HeaderTitle = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Lecture Hall Management System
        </Typography>
        <Typography variant="subtitle1">Faculty of Technology</Typography>
    </Box>
);

export default HeaderTitle;
