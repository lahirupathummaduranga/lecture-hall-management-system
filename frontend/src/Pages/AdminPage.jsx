import React from 'react';
import NavBar from '../Components/Header/NavBar';
import ProfileAndDateTime from '../Components/ProfileAndDateTime/ProfileAndDateTime';
import SubNavTabBar from '../Components/SubNavTabBar';
import Footer from '../Components/Footer/MainFooterComponent';

function AdminPage({ userDetails, onLogout }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <NavBar onLogout={onLogout} />
      <ProfileAndDateTime userDetails={userDetails} />
      <SubNavTabBar />
      <Footer />
    </div>
  );
}

export default AdminPage;
