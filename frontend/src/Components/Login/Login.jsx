import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Link,
  Snackbar,
  InputAdornment,
  IconButton,
  Paper,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import BackgroundImage from '../../assets/backgroud.png';
import logo from '../../assets/logo.png';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);

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
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Error during authentication');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleSnackbarClose = () => setSnackbarOpen(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handlePrivacyPolicyOpen = () => setPrivacyPolicyOpen(true);
  const handlePrivacyPolicyClose = () => setPrivacyPolicyOpen(false);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
          zIndex: -1,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh', padding: 2 }}
      >
        <Grid
          item
          xs={12}
          sm={10}
          md={7}
          lg={4}
          component={Paper}
          elevation={12}
          sx={{
            padding: 4,
            borderRadius: '25px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              mb: 3,
              color: '#091057',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Lecture Hall Management System
          </Typography>
          <Box textAlign="center" mb={3}>
            <img src={logo} alt="Logo" style={{ width: '100px', marginBottom: '15px' }} />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 500,
                color: '#1a1a2e',
                fontSize: '1.15rem',
              }}
            >
              Sign In To Your Account
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleLogin}>
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
              sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
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
              sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end" aria-label="toggle password visibility">
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
                backgroundColor: '#102C57',
                color: '#fff',
                '&:hover': { backgroundColor: '#1F3F79' },
                textTransform: 'uppercase',
                borderRadius: '25px',
                padding: '14px 0',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'LogIn'}
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link href="#" variant="body2" onClick={handleDialogOpen} sx={{ color: '#1a1a2e', fontSize: '0.9rem', cursor: 'pointer' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handlePrivacyPolicyOpen}sx={{ color: '#1a1a2e', fontSize: '0.9rem' }}>
                Privacy Policy
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Please contact your system administrator for assistance with password recovery.
              By proceeding, you agree to our Privacy Policy.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} sx={{ color: '#1a1a2e' }}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={privacyPolicyOpen} onClose={handlePrivacyPolicyClose}>
          <DialogContent>
            <Typography variant="h6" sx={{ mb: 2, fontSize: '1.5rem'}}>
              Privacy Policy
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
            1. This privacy policy explains how we collect, use, and protect your personal information when using our Lecture Hall Management System.<br/><br/>
            2. We collect personal information such as email addresses and passwords necessary for account creation and authentication.<br/><br/>
            3. Your data is used to provide and improve the service, manage user accounts, and communicate with users regarding system updates and support.<br/><br/>
            4. We implement security measures to protect your data from unauthorized access, alteration, or disclosure.<br/><br/>
            5. We do not share your personal information with third parties except as required by law or to provide the service.<br/><br/>
            6. You have the right to access, correct, or delete your personal data. Please contact us if you wish to exercise these rights.<br/><br/>
            7. We may update this policy from time to time. We will notify you of any significant changes.<br/><br/>
            8. If you have any questions about this privacy policy, please contact us at [contact@example.com].<br/><br/>
            Thank you for using our system..!
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePrivacyPolicyClose} sx={{ color: '#1a1a2e' }}>Close</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message="Login successful!"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Grid>
    </Box>
  );
};

export default Login;



