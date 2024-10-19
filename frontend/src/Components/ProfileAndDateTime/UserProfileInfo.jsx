import React from 'react';
import { Box, Typography } from '@mui/material';

const UserProfileInfo = ({ userDetails }) => (
    <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            {userDetails?.name || 'John Doe'}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            {'Faculty of Technology'}
        </Typography>
        <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
            {'Department of Information and Communication Technology'}
        </Typography>
    </Box>
);

export default UserProfileInfo
