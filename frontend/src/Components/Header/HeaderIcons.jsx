import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Box } from '@mui/material';
import { Message as MessageIcon, Notifications as NotificationsIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';

const HeaderIcons = ({ onLogout }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        handleMenuClose();
        onLogout();
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="large" edge="end" color="inherit" sx={{ margin: '0 8px' }}>
                <MessageIcon />
            </IconButton>
            <IconButton size="large" edge="end" color="inherit" sx={{ margin: '0 8px' }}>
                <NotificationsIcon />
            </IconButton>
            <IconButton
                size="large"
                edge="end"
                color="inherit"
                sx={{ margin: '0 8px' }}
                onClick={handleMenuOpen}
            >
                <AccountCircleIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
        </Box>
    );
};

export default HeaderIcons;
