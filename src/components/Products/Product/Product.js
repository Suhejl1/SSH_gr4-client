import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardActionArea,
  IconButton
} from "@material-ui/core";
import { AddShoppingCart, Favorite } from "@material-ui/icons";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Product = ({ product, onAddToCart, onAddToWishlist }) => {
  const classes = useStyles();
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleAddToWishlist = () => {
    // Toggle the state and call the onAddToWishlist function
    setIsInWishlist(!isInWishlist);
    onAddToWishlist(product.id, 1);
  };

  return (
    <Card className={classes.root}>
      <Link to={`product-view/${product.id}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.title}
          />
        </CardActionArea>
      </Link>
      <CardContent>
        <div className={classes.cardContent}>
          <p className={classes.cardContentName}> {product.title}</p>
        </div>
        <div className={classes.cardContent}>
          <p className={classes.cardContentPrice}>
            <b>{`${product.price} €`}</b>
          </p>
        </div>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <div className={classes.cartButtonContainer}>
          <Button
            variant="contained"
            className={classes.button}
            style={{flex: "0 0 auto"}}
            endIcon={<AddShoppingCart />}
            onClick={() => onAddToCart(product.id, 1)}
          >
            <b>ADD TO CART</b>
          </Button>
          </div>
          <div>
          <IconButton
              className={classes.wishlistButton}
              onClick={handleAddToWishlist}
              color={isInWishlist ? "secondary" : "default"}
            >
              <Favorite />
            </IconButton>
          </div>
      </CardActions>
    </Card>
  );
};

export default Product;
