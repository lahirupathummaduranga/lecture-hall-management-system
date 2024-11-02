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
import BackgroundImage from '../../assets/backgroud.png'; // Replace with your background image
import logo from '../../assets/logo.png';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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
          filter: 'blur(8px)',
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
          lg={5}
          component={Paper}
          elevation={12}
          sx={{
            padding: 5,
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              mb: 3,
              color: '#1a1a2e',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Lecture Hall Management System
          </Typography>
          <Box textAlign="center" mb={3}>
            <img src={logo} alt="Logo" style={{ width: '90px', marginBottom: '15px' }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                color: '#1a1a2e',
                fontSize: '1.1rem',
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
                backgroundColor: '#1a1a2e',
                color: '#fff',
                '&:hover': { backgroundColor: '#16213e' },
                textTransform: 'uppercase',
                borderRadius: '25px',
                padding: '14px 0',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Log In'}
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link href="#" variant="body2" onClick={handleDialogOpen} sx={{ color: '#1a1a2e', fontSize: '0.9rem', cursor: 'pointer' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" sx={{ color: '#1a1a2e', fontSize: '0.9rem' }}>
                Privecy Policy
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
