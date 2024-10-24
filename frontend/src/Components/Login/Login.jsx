import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Snackbar,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../../assets/logo.png';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State for forgot password dialog
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false); // State for privacy policy dialog
  const [pageLoading, setPageLoading] = useState(true); // State for page loading effect
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state

  // Simulate page loading delay
  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false); // Page has finished loading
    }, 2000); // Delay for 2 seconds to simulate loading effect
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      onLoginSuccess(user);
      setSnackbarOpen(true); // Show success feedback
    } catch (err) {
      setError(err.response?.data?.message || 'Error during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpen = () => setDialogOpen(true); // Function to open forgot password dialog
  const handleDialogClose = () => setDialogOpen(false); // Function to close forgot password dialog

  const handlePrivacyDialogOpen = () => setPrivacyDialogOpen(true); // Function to open privacy policy dialog
  const handlePrivacyDialogClose = () => setPrivacyDialogOpen(false); // Function to close privacy policy dialog

  const togglePasswordVisibility = () => setShowPassword(!showPassword); // Toggle password visibility

  const handleSnackbarClose = () => setSnackbarOpen(false); // Close snackbar

  // If the page is still loading, show the loading spinner
  if (pageLoading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh', backgroundColor: '#f0f4f8' }}
      >
        <CircularProgress size={60} sx={{ color: '#131842' }} />
      </Grid>
    );
  }

  // Once loading is done, render the main content
  return (
    <>
      <Grid
        container
        component="main"
        sx={{ height: '100vh', backgroundColor: '#f0f4f8' }} // Light background
      >
        {/* Left Side - Logo and Welcome Text */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: 'linear-gradient(to bottom, #131842, #243f82)', // Gradient background for the left side
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            color: '#fff',
          }}
        >
          <img src={logo} alt="Logo" style={{ width: '240px', marginBottom: '20px' }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Welcome to Lecture Hall Management System
          </Typography>
          <Typography variant="body1" align="center" sx={{ maxWidth: '300px', marginBottom: '20px' }}>
            A comprehensive solution designed to streamline and enhance the
            management of lecture halls and academic spaces. Whether you're a
            faculty member, administrator, or student, our system is tailored
            to meet your needs effectively.
          </Typography>
        </Grid>

        {/* Right Side - Login Form */}
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
            padding: 6,
            borderRadius: '0px 20px 20px 0px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
            '@media (max-width:600px)': {
              borderRadius: '0px', // Remove rounded corners for smaller devices
            },
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
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
              sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ marginTop: '8px' }}>
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
                backgroundColor: '#131842',
                color: '#fff',
                '&:hover': { backgroundColor: '#243f82' },
                textTransform: 'none',
                borderRadius: '30px',
                padding: '10px 0',
                fontWeight: 'bold',
                position: 'relative',
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Login'}
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link href="#" variant="body2" sx={{ color: '#131842' }} onClick={handleDialogOpen}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" sx={{ color: '#131842' }} onClick={handlePrivacyDialogOpen}>
                  Privacy policy
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar for Success Message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Login successful!"
      />

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
          <Button onClick={handleDialogClose} variant="contained" sx={{ backgroundColor: '#131842', color: '#fff' }}>
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
            1. This privacy policy explains how we collect, use, and protect your personal information when using our Lecture Hall Management System.
            2. We collect personal information such as email addresses and passwords necessary for account creation and authentication.
            3. Your data is used to provide and improve the service, manage user accounts, and communicate with users regarding system updates and support.
            4. We implement security measures to protect your data from unauthorized access, alteration, or disclosure.
            5. We do not share your personal information with third parties except as required by law or to provide the service.
            6. You have the right to access, correct, or delete your personal data. Please contact us if you wish to exercise these rights.
            7. We may update this policy from time to time. We will notify you of any significant changes.
            8. If you have any questions about this privacy policy, please contact us at [contact@example.com].
            Thank you for using our system.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrivacyDialogClose} variant="contained" sx={{ backgroundColor: '#131842', color: '#fff' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
