import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import './App.css';
import AdminPage from './Pages/AdminPage';
import Student from './Pages/Student';
import HallAttendant from './Pages/HallAttendant';
import Lecture from './Pages/Lecture'; 
import Login from './Components/Login/Login';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token && user) {
          setIsAuthenticated(true);
          setUserDetails(user);
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('Failed to fetch user details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setUserDetails(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUserDetails(null);
    } catch (error) {
      console.error('Error during logout:', error);
      setError('Logout failed. Please try again.');
    }
  };

  const renderPage = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    if (!isAuthenticated) {
      return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    switch (userDetails.role) {
      case 'Admin':
        return <AdminPage userDetails={userDetails} onLogout={handleLogout} />;
      case 'Student':
        return <Student userDetails={userDetails} onLogout={handleLogout} />;
      case 'Non-Academic':
        return <HallAttendant userDetails={userDetails} onLogout={handleLogout} />;
      case 'Lecturer':
        return <Lecture userDetails={userDetails} onLogout={handleLogout} />;
      default:
        return <div>Unauthorized</div>;
    }
  };

  return (
    <>
      {renderPage()}
    </>
  );
}

export default App;
