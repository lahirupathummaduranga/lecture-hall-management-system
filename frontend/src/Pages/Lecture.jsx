import React, { useState } from 'react';
import NavBar from '../Components/Header/NavBar';
import ProfileAndDateTime from '../Components/ProfileAndDateTime/ProfileAndDateTime';
import Scheduled from '../Components/Schedule';
import Footer from '../Components/Footer/MainFooterComponent';
import Button from '@mui/material/Button'; // Import Material-UI Button
import TextField from '@mui/material/TextField'; // Import Material-UI TextField
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar for feedback
import MuiAlert from '@mui/material/Alert'; // Import Alert component for Snackbar
import { Typography } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Lecturer({ userDetails, onLogout }) {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [issueDetails, setIssueDetails] = useState({
        issueDescription: '', // Updated from 'issue' to 'issueDescription'
        lectureHall: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/issues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(issueDetails),
            });
            const data = await response.json();

            if (response.ok) {
                console.log('Issue reported successfully:', data);
                setSnackbarMessage('Issue reported successfully!');
                setSnackbarSeverity('success');
            } else {
                console.error('Error reporting issue:', data);
                setSnackbarMessage(`Error: ${data.message}`);
                setSnackbarSeverity('error');
            }
        } catch (error) {
            console.error('Error reporting issue:', error);
            setSnackbarMessage('Error reporting issue, please try again later.');
            setSnackbarSeverity('error');
        }

        // Reset form fields
        setIssueDetails({ issueDescription: '', lectureHall: '' }); // Reset fields
        setIsPopupVisible(false); // Close popup after submission
        setSnackbarOpen(true); // Open snackbar for feedback
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <NavBar onLogout={onLogout} />
            <ProfileAndDateTime userDetails={userDetails} />
            <div style={{ padding: '16px' }} >
                <Typography variant="h5" sx={{ marginBottom: '16px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                    Welcome, {userDetails.name}!
                </Typography>
                <Scheduled />

                {/* Report Issue Button */}
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
                            <TextField
                                label="Issue"
                                name="issueDescription" // Changed from 'issue' to 'issueDescription'
                                value={issueDetails.issueDescription} // Updated to match state
                                onChange={handleInputChange}
                                required
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                            />
                            <br />
                            <TextField
                                label="Lecture Hall"
                                name="lectureHall"
                                value={issueDetails.lectureHall}
                                onChange={handleInputChange}
                                required
                                variant="outlined"
                                fullWidth
                                style={{ marginTop: '10px' }}
                            />
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

            {/* Snackbar for feedback */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
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
