import React, { useState } from 'react';
import { AppBar, Toolbar, Drawer } from '@mui/material';
import HeaderLogo from './HeaderLogo';
import HeaderTitle from './HeaderTitle';
import HeaderIcons from './HeaderIcons';
import MobileMenuButton from './MobileMenuButton';
import DrawerList from './DrawerList';

const NavBar = ({ onLogout, notificationCount }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#131842' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <HeaderLogo />
                    <HeaderTitle />
                    <HeaderIcons onLogout={onLogout} notificationCount={notificationCount} />
                    <MobileMenuButton onClick={toggleDrawer(true)} />
                </Toolbar>
            </AppBar>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <DrawerList toggleDrawer={toggleDrawer} />
            </Drawer>
        </>
    );
};

export default NavBar;
