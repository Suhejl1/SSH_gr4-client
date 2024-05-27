import React from 'react';
import { Typography, Divider, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Confirmation = ({ order, error }) => (
    <div>
        {error ? (
            <>
                <Typography variant="h5">Error: {error}</Typography>
                <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
            </>
        ) : (
            <>
                <Typography variant="h5">Thank you for your purchase!</Typography>
                <Divider />
                <Typography variant="subtitle2">Your order has been placed successfully.</Typography>
                <br />
                <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
            </>
        )}
    </div>
);

export default Confirmation;
