import React from "react";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import { useState, useEffect } from "react";
import "./style.css";
import axios from 'axios';

const createMarkup = (text) => {
  return { __html: text };
};

const ProductView = () => {
  const [product, setProduct] = useState({});

  // const fetchProduct = async (id) => {
  //   const response = await commerce.products.retrieve(id);
  //   console.log({ response });
  //   const { name, price, media, quantity, description } = response;
  //   setProduct({
  //     name,
  //     quantity,
  //     description,
  //     src: media.source,
  //     price: price.formatted_with_symbol,
  //   });
  // };

  const fetchProduct = async (id) => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/books/${id}`);

      const {title, price, image, description} = response.data;

      setProduct({
        title,
        description,
        image,
        price: `${price} €`
      });
    }catch (error){
      console.log("Error fetching product: ", error);
    }
  }

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.substring(path.lastIndexOf('/') + 1);
    fetchProduct(id);
  }, []);

  return (
    <Container className="product-view">
      <Grid container>
        <Grid item xs={12} md={6} className="image-wrapper">
          <img src={product.image} alt={product.title} />
        </Grid>
        <Grid item xs={12} md={5} className="text">
          <Typography variant="h2">
            <b>{product.title}</b>
          </Typography>
          <Typography
            variant="p"
            dangerouslySetInnerHTML={createMarkup(product.description)}
          />
          <Typography variant="h3" color="secondary">
            Price: <b> {product.price} </b>
          </Typography>
          <br />
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Button
                size="large"
                className="custom-button"
                component={Link}
                to="/home"
              >
                Continue Shopping
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductView;
