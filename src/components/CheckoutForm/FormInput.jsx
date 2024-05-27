import React from 'react';
import { TextField, Grid } from '@material-ui/core';

const FormInput = ({ name, label, required, value, onChange }) => {
    return (
        <Grid item xs={12} sm={6}>
            <TextField
                fullWidth
                label={label}
                required={required}
                name={name}
                value={value}
                onChange={onChange}
            />
        </Grid>
    );
};

export default FormInput;
