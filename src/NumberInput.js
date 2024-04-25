import React from 'react';
import TextField from '@mui/material/TextField';

const NumberInput = ({ label, value, onChange }) => {
    return (
        <TextField
            label={label}
            type="number"
            InputLabelProps={{ shrink: true }}
            value={value}
            onChange={e => onChange(e.target.value)}
            fullWidth
            variant="outlined"
            inputProps={{
                min: 1,
                max: 10,
            }}
        />
    );
};

export default NumberInput;
