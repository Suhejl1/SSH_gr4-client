import React, { useState } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';

const AddressForm = ({ next }) => {
  const [formData, setFormData] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    city: '',
    zip: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    next(formData);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <FormInput required name="userId" label="User ID" value={formData.userId} onChange={handleChange} />
          <FormInput required name="firstName" label="First name" value={formData.firstName} onChange={handleChange} />
          <FormInput required name="lastName" label="Last name" value={formData.lastName} onChange={handleChange} />
          <FormInput required name="address" label="Address" value={formData.address} onChange={handleChange} />
          <FormInput required name="email" label="Email" value={formData.email} onChange={handleChange} />
          <FormInput required name="city" label="City" value={formData.city} onChange={handleChange} />
          <FormInput required name="zip" label="ZIP / Postal code" value={formData.zip} onChange={handleChange} />
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
          <Button type="submit" variant="contained" color="primary">Next</Button>
        </div>
      </form>
    </>
  );
};

export default AddressForm;
