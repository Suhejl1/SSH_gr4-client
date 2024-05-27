import React from 'react';
import { Typography, List, ListItem, ListItemText, Grid } from '@material-ui/core';

const Review = ({ cart, shippingData }) => {
  const subtotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);

  return (
    <>
      <Typography variant="h6" gutterBottom>Order summary</Typography>
      <List disablePadding>
        {cart.map((product) => (
          <ListItem key={product.id}>
            <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {subtotal}
          </Typography>
        </ListItem>
      </List>
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>Shipping</Typography>
      <Typography gutterBottom>{shippingData.firstName} {shippingData.lastName}</Typography>
      <Typography gutterBottom>{shippingData.address}, {shippingData.city}, {shippingData.zip}</Typography>
      <Typography gutterBottom>{shippingData.email}</Typography>
    </>
  );
};

export default Review;

