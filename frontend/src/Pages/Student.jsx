import React from 'react';
import NavBar from '../Components/Header/NavBar';
import ProfileAndDateTime from '../Components/ProfileAndDateTime/ProfileAndDateTime';

import Footer from '../Components/Footer/MainFooterComponent';

function Student({ userDetails, onLogout }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <NavBar onLogout={onLogout} />
      <ProfileAndDateTime userDetails={userDetails} />
      <div>
      <h1>Welcome, {userDetails.name}</h1>
      <p>You are logged in as a Student.</p>
      <div></div>
      <div></div>
      <div></div>
    </div>
      <Footer />
    </div>
  );
}

export default Student; // Ensure this is a default export
