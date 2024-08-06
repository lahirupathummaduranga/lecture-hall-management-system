import React from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const MobileMenuButton = ({ onClick }) => (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton size="large" edge="end" color="inherit" onClick={onClick}>
            <MenuIcon />
        </IconButton>
    </Box>
);

export default MobileMenuButton;
