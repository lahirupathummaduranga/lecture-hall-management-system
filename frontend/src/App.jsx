import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true); // New state for loading status
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token && user) {
          // Optionally, you can verify the token with your backend
          // await axios.post('http://localhost:3000/api/auth/verify', { token });
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
      return <div>Loading...</div>; // Show loading indicator while fetching user details
    }

    if (error) {
      return <div>{error}</div>; // Show error message if there's an error
    }

    if (!isAuthenticated) {
      return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    if (userDetails.role === 'Admin') {
      return <AdminPage userDetails={userDetails} onLogout={handleLogout} />;
    } else if (userDetails.role === 'Student') {
      return <Student userDetails={userDetails} onLogout={handleLogout} />;
    } else if (userDetails.role === 'Non-Academic') {
      return <HallAttendant userDetails={userDetails} onLogout={handleLogout} />;
    } else if (userDetails.role === 'Lecturer') {
      return <Lecture userDetails={userDetails} onLogout={handleLogout} />;
    } 
    

    return <div>Unauthorized</div>;
  };

  return (
    <>
      {renderPage()}
    </>
  );
}

export default App;
