import React from 'react';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: 56,
    height: 56,
    marginRight: theme.spacing(2),
}));

const ProfileAvatarComponent = ({ imageUrl }) => (
    <ProfileAvatar alt="Profile Picture" src={imageUrl} />
);

export default ProfileAvatarComponent;
