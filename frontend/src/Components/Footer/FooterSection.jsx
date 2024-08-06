import React from 'react';
import { Box, Typography } from '@mui/material';

const FooterSection = ({ children, title }) => (
    <Box sx={{ textAlign: 'left', marginBottom: { xs: '1rem', md: '0' } }}>
        {title && (
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                {title}
            </Typography>
        )}
        {children}
    </Box>
);

export default FooterSection