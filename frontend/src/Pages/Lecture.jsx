import React from 'react';
import NavBar from '../Components/Header/NavBar';
import ProfileAndDateTime from '../Components/ProfileAndDateTime/ProfileAndDateTime';
import Scheduled from '../Components/mini-cal';

import Footer from '../Components/Footer/MainFooterComponent';


function Lecturer({ userDetails, onLogout }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <NavBar onLogout={onLogout} />
      <ProfileAndDateTime userDetails={userDetails} />
      <div>
      <h1>Welcome, {userDetails.name}</h1>
      <p>You are logged in as a Lecturer.</p>
      <Scheduled/>
      <div></div>
      <div></div>
    </div>
      <Footer />
    </div>
  );
}

export default Lecturer; // Ensure this is a default export