import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import CustomTooltip from './CustomTooltip';

const BarChartComponent = ({ data }) => (
    <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
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
);

export default BarChartComponent;
