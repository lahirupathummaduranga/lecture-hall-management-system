import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Paper,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import logo from '../../assets/logo.png';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State for forgot password dialog
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false); // State for privacy policy dialog

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });
      alert('Logged in successfully!');
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      onLoginSuccess(user);
    } catch (err) {
      setError(err.response?.data?.message || 'Error during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpen = () => setDialogOpen(true);  // Function to open forgot password dialog
  const handleDialogClose = () => setDialogOpen(false); // Function to close forgot password dialog

  const handlePrivacyDialogOpen = () => setPrivacyDialogOpen(true); // Function to open privacy policy dialog
  const handlePrivacyDialogClose = () => setPrivacyDialogOpen(false); // Function to close privacy policy dialog

  return (
    <>
      <Grid
        container
        component="main"
        sx={{ height: '100vh' }}
      >
        {/* Left Side */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: '#d1e7ff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
          }}
        >
          <img src={logo} alt="Logo" style={{ width: '280px', marginBottom: '30px' }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Welcome to Lecture Hall Management System
          </Typography>
          <Typography variant="body1" align="center" sx={{ maxWidth: '300px' }}>
            A comprehensive solution designed to streamline and enhance the
            management of lecture halls and academic spaces. Whether you're a
            faculty member, administrator, or student, our system is tailored
            to meet your needs effectively.
          </Typography>
        </Grid>

        {/* Right Side */}
        <Grid
          item
          xs={12}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            borderRadius: '0px 20px 20px 0px', // Ensure rounded corners on right side only
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
            Sign In To Your Account
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%', maxWidth: '400px' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ backgroundColor: '#f5f5f5', borderRadius: '4px' }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ backgroundColor: '#f5f5f5', borderRadius: '4px' }}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#333',
                color: '#fff',
                '&:hover': { backgroundColor: '#555' },
                textTransform: 'none',
                borderRadius: '20px',
              }}
            >
              {loading ? 'Loading...' : 'Login'}
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link href="#" variant="body2" sx={{ color: '#333' }} onClick={handleDialogOpen}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" sx={{ color: '#333' }} onClick={handlePrivacyDialogOpen}>
                  Privacy policy
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Dialog for Forgot Password */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          IMPORTANT
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            To change your password, please meet the admin in the administrator's office.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Privacy Policy */}
      <Dialog
        open={privacyDialogOpen}
        onClose={handlePrivacyDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Privacy Policy
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ textAlign: 'left', whiteSpace: 'pre-line' }}>
            1.This privacy policy explains how we collect, use, and protect your personal information when using our Lecture Hall Management System.<br></br>

            2.We collect personal information such as email addresses and passwords necessary for account creation and authentication. <br></br>

            3.Your data is used to provide and improve the service, manage user accounts, and communicate with users regarding system updates and support.<br></br>

            4.We implement security measures to protect your data from unauthorized access, alteration, or disclosure. <br></br>

            5.We do not share your personal information with third parties except as required by law or to provide the service.<br></br>

            6.You have the right to access, correct, or delete your personal data. Please contact us if you wish to exercise these rights.,<br></br>

            7.We may update this policy from time to time. We will notify you of any significant changes.<br></br>

            8.If you have any questions about this privacy policy, please contact us at [contact@example.com].<br></br>

            Thank you for using our system.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrivacyDialogClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
