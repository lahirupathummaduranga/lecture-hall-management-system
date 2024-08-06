import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

const DrawerItem = ({ icon, text }) => (
    <ListItem button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
    </ListItem>
);

export default DrawerItem;
