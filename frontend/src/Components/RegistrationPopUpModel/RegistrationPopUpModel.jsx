import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Tabs, Tab, Box, Typography } from '@mui/material';
import RegisterUserForm from './RegisterUserForm';
import BatchRegister from './BatchRegister';
import DepartmentRegister from './DepartmentRegister';
import LectureHallRegister from './LectureHallRegister';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const ModalWithSubNav = ({ open, handleClose }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="sub-nav tabs">
          <Tab label="User Registration" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="Batch Registration" id="tab-1" aria-controls="tabpanel-1" />
          <Tab label="Department Registration" id="tab-2" aria-controls="tabpanel-2" />
          <Tab label="Lecture hall Registration" id="tab-3" aria-controls="tabpanel-3" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <RegisterUserForm />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <BatchRegister />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <DepartmentRegister />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <LectureHallRegister />
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

const RegistrationPopUpModel = ({ open, handleClose }) => {
  return (
    <ModalWithSubNav open={open} handleClose={handleClose} />
  );
};

export default RegistrationPopUpModel;
