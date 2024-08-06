import React from 'react';
import { Box } from '@mui/material';
import logo from '../../assets/logo.png'

const HeaderLogo = () => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ height: '80px', margin: '10px' }} />
    </Box>
);

export default HeaderLogo;
