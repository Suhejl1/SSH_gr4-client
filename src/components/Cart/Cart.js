import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const classes = useStyles();

  const renderEmptyCart = () => {
    console.log("Rendering empty cart message"); // Debug message
    return (
      <Typography variant="subtitle1">
        Shopping cart is empty. <Link className={classes.link} to="/">Start adding some</Link>!
      </Typography>
    );
  };



  const handleEmptyCart = () => onEmptyCart();
  console.log('Cart contents:', cart);
  console.log("this is the cart length", cart.length)
  if (!cart || Object.keys(cart).length === 0) {
    console.log("Condition is true");
    return (renderEmptyCart());
  }


  const subtotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);




  if (!cart.length) return 'Loading';

  const renderCart = () => (
    <>
      <Grid container spacing={4}>
        {cart.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem item={lineItem} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5" >Subtotal: <b >{subtotal}</b></Typography>
        <div>
          <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
          <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" >Checkout</Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5" gutterBottom><b>Your Shopping Cart</b></Typography>
      <hr />
      {!cart.length ? renderEmptyCart() : renderCart()}
    </Container>
  );
};

export default Cart;
