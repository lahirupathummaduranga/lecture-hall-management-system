
import React from 'react';
import NavBar from '../Components/Header/NavBar';
import ProfileAndDateTime from '../Components/ProfileAndDateTime/ProfileAndDateTime';
import Mini from '../Components/mini-cal';

import Footer from '../Components/Footer/MainFooterComponent';

function HallAttendant({ userDetails, onLogout }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <NavBar onLogout={onLogout} />
        <ProfileAndDateTime userDetails={userDetails} />
        <div>
        <h1>Welcome, {userDetails.name}</h1>
        <p>You are logged in as a Hall Attend.</p><Mini/>
        <div></div>
        <div></div>
        <div></div>
      </div>
      
        <Footer />
      </div>
    );
  }
  
  export default HallAttendant; // Ensure this is a default export
  