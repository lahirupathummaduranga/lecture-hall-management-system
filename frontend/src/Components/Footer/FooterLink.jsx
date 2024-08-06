import React from 'react';
import { Link } from '@mui/material';

const FooterLink = ({ href, children, target }) => (
    <Link href={href} sx={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '5px' }} target={target}>
        {children}
    </Link>
);

export default FooterLink