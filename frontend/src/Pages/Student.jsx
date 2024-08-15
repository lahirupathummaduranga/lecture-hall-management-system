import React from 'react';
import NavBar from '../Components/Header/NavBar';
import ProfileAndDateTime from '../Components/ProfileAndDateTime/ProfileAndDateTime';
import Footer from '../Components/Footer/MainFooterComponent';
import { Box, Button, IconButton, Typography, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Mini from '../Components/mini-cal';

function Student({ userDetails, onLogout }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
      <NavBar onLogout={onLogout} />
      <ProfileAndDateTime userDetails={userDetails} />

      {/* Main Content Box */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', padding: '16px' }}>
        <Box
          sx={{
            padding: '16px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '800px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">Today</Typography>
            <IconButton>
              <ArrowForwardIcon />
            </IconButton>
          </Stack>

          <Stack spacing={2} sx={{ marginTop: '16px' }}>
            {/* List items with View buttons */}
            {[1, 2, 3, 4, 5].map((item, index) => (
              <Stack
                key={index}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  backgroundColor: '#e3f2fd',
                  padding: '8px 16px',
                  borderRadius: '4px',
                }}
              >
                <Typography variant="body1">Task {item}</Typography>
                <Button variant="contained" sx={{ backgroundColor: '#64b5f6' }}>
                  View
                </Button>
              </Stack>
            ))}
          </Stack>
        </Box>
      </div>
      
      <Mini />
      <Footer />
    </div>
  );
}

export default Student;
