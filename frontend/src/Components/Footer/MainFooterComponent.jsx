import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import FooterSection from './FooterSection';
import FooterLink from './FooterLink';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box component="footer">
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '1rem',
          backgroundColor: '#131842',
          borderTop: '1px solid #e7e7e7',
          color: 'white',
        }}
      >
        <FooterSection>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Lecture Hall Management System
          </Typography>
          <Typography sx={{ fontSize: '15px', marginTop: '10px' }}>
            Your Gateway to Seamless Lecture Hall <br /> Management System
          </Typography>
        </FooterSection>

        <FooterSection title="Useful Links">
          <FooterLink href="https://lms.tech.sjp.ac.lk/login/index.php" target="_blank">
            LMS - Faculty of Technology
          </FooterLink>
          <FooterLink href="https://tech.sjp.ac.lk/" target="_blank">
            Faculty of Technology
          </FooterLink>
          <FooterLink href="https://www.sjp.ac.lk/" target="_blank">
            University of Sri Jayewardenepura
          </FooterLink>
        </FooterSection>

        <FooterSection title="Contact Us">
          <Typography sx={{ marginTop: '10px' }}>
            Faculty of Technology <br />
            University of Sri Jayewardenepura <br />
            Dampe - Pitipana Rd, Homagama<br></br><br></br>
          </Typography>
          <Typography>+94 11 2356879</Typography>
          <Typography>info@fot.sjp.ac.lk</Typography>
        </FooterSection>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: '#17153B',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography>&copy; {currentYear} Faculty of Technology | All rights reserved</Typography>
      </Box>
    </Box>
  );
};



export default Footer;
