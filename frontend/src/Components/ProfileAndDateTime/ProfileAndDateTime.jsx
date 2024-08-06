import React from 'react';
import { Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../assets/logo.png';
import ProfileAvatarComponent from './ProfileAvatar';
import UserProfileInfo from './UserProfileInfo';
import CurrentTimeDisplay from './CurrentTimeDisplay';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ProfileAndDateTime = ({ userDetails }) => {
  const profileImageUrl = userDetails.profileImage ? `http://localhost:3000/uploads/${userDetails.profileImage}` : logo;

  return (
    <Grid container justifyContent="space-between" alignItems="center" sx={{ padding: '0 20px 0 60px', backgroundColor: '#E7F0DC', marginTop: '20px' }}>
      <StyledBox>
        <ProfileAvatarComponent imageUrl={profileImageUrl} />
        <UserProfileInfo userDetails={userDetails} />
      </StyledBox>
      <CurrentTimeDisplay />
    </Grid>
  );
}

export default ProfileAndDateTime;
