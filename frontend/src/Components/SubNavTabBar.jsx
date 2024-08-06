import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BarReport from './BarGraph/BarReport';
import RegisterUserForm from './RegistrationPopUpModel/RegisterUserForm';
import UserTable from './UserTable';
import Schedule from './Schedule';


function SubNavTabBar() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '10px' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Report" />
        <Tab label="User Management" />
        <Tab label="Schedule" />

      </Tabs>
      <Box sx={{ padding: '20px' }}>
        {value === 0 && <BarReport />}
        {value === 1 && <UserTable />}
        {value === 2 && <Schedule />}
      </Box>
    </Box>
  );
}

export default SubNavTabBar;

