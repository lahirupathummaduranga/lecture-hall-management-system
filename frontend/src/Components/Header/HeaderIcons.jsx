import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Box, Badge } from '@mui/material';
import { Message as MessageIcon, Notifications as NotificationsIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';

const HeaderIcons = ({ onLogout, notificationCount }) => {
    const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

    const handleProfileMenuOpen = (event) => {
        setProfileMenuAnchor(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileMenuAnchor(null);
    };

    const handleLogoutClick = () => {
        handleProfileMenuClose();
        onLogout();
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="large" edge="end" color="inherit" sx={{ margin: '0 10px' }}>
                <MessageIcon />
            </IconButton>
            <IconButton size="large" edge="end" color="inherit">
                <Badge badgeContent={notificationCount} color="error" sx={{ margin: '0 10px' }}>
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <IconButton size="large" edge="end" color="inherit" onClick={handleProfileMenuOpen} sx={{ margin: '0 10px' }}>
                <AccountCircleIcon />
            </IconButton>
            <Menu
                anchorEl={profileMenuAnchor}
                open={Boolean(profileMenuAnchor)}
                onClose={handleProfileMenuClose}
            >
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
        </Box>
    );
};

export default HeaderIcons;
