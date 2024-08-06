import React, { useState, useEffect } from 'react';
import './App.css';
import AdminPage from './Pages/AdminPage';
import Login from './Components/Login/Login';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      setIsAuthenticated(true);
      setUserDetails(user);
    }
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
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <AdminPage userDetails={userDetails} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default App;
