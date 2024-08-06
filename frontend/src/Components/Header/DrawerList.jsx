import React from 'react';
import { Box, List } from '@mui/material';
import DrawerItem from './DrawerItem';
import { Message as MessageIcon, Notifications as NotificationsIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';

const DrawerList = ({ toggleDrawer }) => (
    <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
    >
        <List>
            <DrawerItem icon={<MessageIcon />} text="Messages" />
            <DrawerItem icon={<NotificationsIcon />} text="Notifications" />
            <DrawerItem icon={<AccountCircleIcon />} text="Profile" />
        </List>
    </Box>
);

export default DrawerList;
