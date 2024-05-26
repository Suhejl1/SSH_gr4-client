import React, { useState, useRef, useEffect } from "react";
import { Grid, InputAdornment, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Product from "./Product/Product.js";
import useStyles from "./styles";
import logo1 from "../../assets/Bookshop.gif";
import scrollImg from "../../assets/scroll.gif";
import "../ProductView/style.css";
import { Link } from "react-router-dom";
import mangaBg from "../../assets/maxresdefault.jpg";
import bioBg from "../../assets/biography.jpg";
import fictionBg from "../../assets/fiction.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from 'axios';
import {Select, MenuItem} from "@material-ui/core";


const Products = ({ products, onAddToCart, onAddToWishlist,featureProducts}) => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [matchedBooks, setMatchedBooks] = useState([]);
  const [noBooksFound, setNoBooksFound] = useState(false);

  const sectionRef = useRef(null);

  const handleInputClick = () => {
    // Scrolls to the section when the input is clicked
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  axios.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token');
      console.log("Bearer token:", token);
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleGenreChange = async (event) => {
    event.persist();

    const selectedGenre = event.target.value;

    setSelectedGenre(selectedGenre);
    console.log(selectedGenre);

    try {
      const genreIdResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/genre/name/${selectedGenre}`);
      console.log("Gender ID is: ", genreIdResponse.data)

      const genreId = genreIdResponse.data;

      const booksResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/books/genre/${genreId}/books`);
      setMatchedBooks(booksResponse.data);
      console.log("Product is fetched")
      console.log(matchedBooks)
      setNoBooksFound(booksResponse.data.length === 0);

    } catch (error) {
      console.error("Error fetching books by genre:", error);
    }
  };

useEffect(() => {
  // Fetch genres from backend
  axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/genre`)
    .then(response => {
      // Extract genre names from response data
      const genreNames = response.data.map(genre => genre.name);
      setGenres(genreNames);
    })
    .catch(error => {
      console.error("Error fetching genres:", error);
    });
}, []);

useEffect(() => {
  console.log("Matched Books Updated:", matchedBooks);
}, [matchedBooks]);

  return (
    <main className={classes.mainPage}>
      <div className={classes.toolbar} />
      <img src={scrollImg} className={classes.scrollImg} />
      <div className={classes.hero}>
        <img className={classes.heroImg} src={logo1} height="720px" />

        <div className={classes.heroCont}>
          <h1 className={classes.heroHeader}>
            Discover Your Next Favorite Book Here.
          </h1>
          <h3 className={classes.heroDesc} ref={sectionRef}>
            Explore our curated collection of new and popular books to find your
            next literary adventure.
          </h3>
          <div className={classes.searchs}>
            <Input
              className={classes.searchb}
              type="text"
              placeholder="Which book are you looking for?"
              onClick={handleInputClick}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </div>
        </div>
      </div>

      {searchTerm === "" && (
        <div className={classes.categorySection}>
          <h1 className={classes.categoryHeader}>Categories</h1>
          <h3 className={classes.categoryDesc}>
            Browse our featured categories
          </h3>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Select the genre:</h2>
            <Select
              value={selectedGenre}
              onChange={handleGenreChange}
              displayEmpty
              className={classes.contentHeader}
              style={{
                width: '500px', 
                borderRadius: '20px', 
                padding: '10px', 
                textAlign: 'center', 
                color: 'white', 
                fontWeight: 'bold', 
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    borderRadius: '20px',
                  },
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Genre
              </MenuItem>
              {genres.map(genre => (
                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
              ))}
            </Select>
          </div>
        </div>
      )}

      {/* Book Display Section */}
      <div className={classes.contentHeader}>
        {noBooksFound ? (
          <div className={classes.noBooks}>
            <h3>No books found for the selected genre.</h3>
          </div>
        ) : (
          matchedBooks.length > 0 && (
            <Grid container spacing={2} justifyContent="center">
              {matchedBooks.map(book => (
                <Grid item xs={12} sm={1} md={4} lg={3} key={book.id}>
                  <Product
                    product={book}
                    onAddToCart={onAddToCart}
                    onAddToWishlist={onAddToWishlist}
                  />
                </Grid>
              ))}
            </Grid>
          )
        )}
      </div>

      <div>
        {searchTerm === "" && (
          <>
            <h1 className={classes.booksHeader}>
              Discover <span style={{ color: "#f1361d" }}>Books</span>
            </h1>
            <h3 className={classes.booksDesc}>
              Explore our comprehensive collection of books.
            </h3>
          </>
        )}
        <div className={classes.mobileSearch}>
          <div className={classes.mobSearchs}>
            <Input
              className={classes.mobSearchb}
              type="text"
              placeholder="Search for books"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </div>
        </div>
        <Grid
          className={classes.content}
          container
          justify="center"
          spacing={2}
        >
          {products
            .filter((product) => {
              if (searchTerm === "") {
                return product;
              } else if (
                product.name
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              ) {
                return product;
              }
            })
            .map((product) => (
              <Grid
                className={classes.content}
                item
                xs={6}
                sm={6}
                md={4}
                lg={3}
                id="pro"
              >
                <Product
                  product={product}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </main>
  );
};

export default Products;
