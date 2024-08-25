import React, { useState } from 'react';
import NavBar from '../Components/Header/NavBar';
import ProfileAndDateTime from '../Components/ProfileAndDateTime/ProfileAndDateTime';
import Scheduled from '../Components/Schedule';
import Footer from '../Components/Footer/MainFooterComponent';
import Button from '@mui/material/Button'; // Import Material-UI Button

function Lecturer({ userDetails, onLogout }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [issueDetails, setIssueDetails] = useState({
    issue: '',
    lectureHall: '',
  });

  const handleReportIssueClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIssueDetails({ ...issueDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log('Reported Issue:', issueDetails);

    // Reset form fields
    setIssueDetails({
      issue: '',
      lectureHall: '',
    });

    setIsPopupVisible(false); // Close popup after submission
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <NavBar onLogout={onLogout} />
      <ProfileAndDateTime userDetails={userDetails} />
      <div style={{ padding: '20px' }}>
        <h1>Welcome, {userDetails.name}</h1>
        <p>You are logged in as a Lecturer.</p>
        <Scheduled />

        {/* Report Issue Button with Styled Colors */}
        <Button
          variant="contained"
          sx={{ backgroundColor: '#64b5f6', textTransform: 'none', marginTop: '20px' }}
          onClick={handleReportIssueClick}
        >
          Report Issue
        </Button>

        {isPopupVisible && (
          <div style={popupStyles}>
            <h2>Report Issue</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Issue:
                <textarea
                  name="issue"
                  value={issueDetails.issue}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Lecture Hall:
                <input
                  type="text"
                  name="lectureHall"
                  value={issueDetails.lectureHall}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              {/* Buttons wrapper to control spacing */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
                <Button variant="contained" onClick={handleClosePopup}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

const popupStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  border: '1px solid #ccc',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
};

export default Lecturer;
