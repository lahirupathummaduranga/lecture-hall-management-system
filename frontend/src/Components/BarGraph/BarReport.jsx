import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Box, Card, FormControl, InputLabel, MenuItem, Select, OutlinedInput, Typography } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p className="label">{`Month: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const BarReport = () => {
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [chartData, setChartData] = useState(months.map(month => ({
    month: month,
    Scheduled: 0,
    Completed: 0,
    Cancelled: 0,
    Postponed: 0
  })));

  useEffect(() => {
    fetchDepartments();
    fetchBatches();
  }, []);

  useEffect(() => {
    if (option1 && option2) {
      fetchChartData(option1, option2);
    }
  }, [option1, option2]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/departments');
      setDepartments(response.data.departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchBatches = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/batches');
      setBatches(response.data.batches);
    } catch (error) {
      console.error('Error fetching batches:', error);
    }
  };

  const fetchChartData = async (departmentId, batchId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/schedules/monthly-summary`, {
        params: {
          departmentId,
          batchId
        }
      });
      processChartData(response.data.data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const processChartData = (data) => {
    const dataMap = data.reduce((acc, item) => {
      acc[item.month - 1] = item;
      return acc;
    }, {});

    const updatedData = chartData.map((item, index) => ({
      month: item.month,
      Scheduled: dataMap[index] ? dataMap[index].Scheduled : 0,
      Completed: dataMap[index] ? dataMap[index].Completed : 0,
      Cancelled: dataMap[index] ? dataMap[index].Cancelled : 0,
      Postponed: dataMap[index] ? dataMap[index].Postponed : 0
    }));

    setChartData(updatedData);
  };

  const handleChange1 = (event) => {
    setOption1(event.target.value);
  };

  const handleChange2 = (event) => {
    setOption2(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', padding: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="select-option1-label">Select Department</InputLabel>
          <Select
            labelId="select-option1-label"
            id="select-option1"
            value={option1}
            onChange={handleChange1}
            input={<OutlinedInput label="Select Department" />}
            MenuProps={MenuProps}
          >
            {departments.map((department) => (
              <MenuItem key={department._id} value={department._id}>
                {department.department}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="select-option2-label">Select Batch</InputLabel>
          <Select
            labelId="select-option2-label"
            id="select-option2"
            value={option2}
            onChange={handleChange2}
            input={<OutlinedInput label="Select Batch" />}
            MenuProps={MenuProps}
          >
            {batches.map((batch) => (
              <MenuItem key={batch._id} value={batch._id}>
                {batch.batch}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Scheduled" fill="#8884d8" />
          <Bar dataKey="Completed" fill="#82ca9d" />
          <Bar dataKey="Cancelled" fill="#FF6347" />
          <Bar dataKey="Postponed" fill="#FFA500" />
        </BarChart>
      </ResponsiveContainer>

    </Box>
  );
};

export default BarReport;
