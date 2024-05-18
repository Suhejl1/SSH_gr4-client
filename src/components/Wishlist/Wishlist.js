import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import WishlistItem from './WishlistItem/WishlistItem';
import useStyles from './style';

const Wishlist = ({ wishlist, onRemoveFromWishlist, onEmptyWishlist }) => {
  const classes = useStyles();

  const renderEmptyWishlist = () => (
    <Typography variant="subtitle1">
      You have no items in your wishlist,
      <Link className={classes.link} to="/"> start adding some</Link>!
    </Typography>
  );

  if (!wishlist.length) return 'Loading';

  const renderWishlist = () => (
    <>
      <Grid container spacing={4}>
        {wishlist.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <WishlistItem 
              item={item} 
              onRemoveFromWishlist={onRemoveFromWishlist} 
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <div>
          <Button 
            className={classes.emptyButton} 
            size="large" 
            type="button" 
            variant="contained" 
            color="secondary" 
            onClick={onEmptyWishlist}
          >
            Empty wishlist
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5" gutterBottom><b>Your Wishlist</b></Typography>
      <hr />
      {!wishlist.length ? renderEmptyWishlist() : renderWishlist()}
    </Container>
  );
};

export default Wishlist;
