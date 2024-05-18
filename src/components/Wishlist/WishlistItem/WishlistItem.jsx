import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './style';

const WishlistItem = ({ item, onRemoveFromWishlist }) => {
  const classes = useStyles();

  const handleRemoveFromWishlist = (lineItemId) => onRemoveFromWishlist(lineItemId);

  return (
    <Card className="cart-item">
      <CardMedia image={item.image} alt={item.name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="h6" color='secondary' >{item.line_total}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {/* <div className={classes.buttons}>
          <Button type="button" size="small" onClick={() => handleUpdateWishlistQty(item.id, item.quantity - 1)}>-</Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button type="button" size="small" onClick={() => handleUpdateWishlistQty(item.id, item.quantity + 1)}>+</Button>
        </div> */}
        <Button className={classes.button} variant="contained" type="button" color='secondary' onClick={() => handleRemoveFromWishlist(item.id)}>Remove</Button>
      </CardActions>
    </Card>
  );
};

export default WishlistItem;
