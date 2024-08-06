import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, OutlinedInput } from '@mui/material';

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

const Dropdown = ({ label, value, onChange, items, itemKey, itemValue }) => (
    <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>{label}</InputLabel>
        <Select
            value={value}
            onChange={onChange}
            input={<OutlinedInput label={label} />}
            MenuProps={MenuProps}
        >
            {items.map(item => (
                <MenuItem key={item[itemKey]} value={item[itemKey]}>
                    {item[itemValue]}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default Dropdown;
