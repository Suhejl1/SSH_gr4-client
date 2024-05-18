import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 64px)', // Adjust for navbar height
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
    maxWidth: '800px', // Adjust maximum width as needed
  },
}));
;

const AddBook = () => {
  const classes = useStyles();
  const [bookData, setBookData] = useState({
    title: '',
    price: '',
    authorName: '',
    authorNationality: '',
    authorBirthDate: '',
    publisherName: '',
    publisherLocation: '',
    publishingYear: '',
    image: '', // Changed to a URL
    description: '',
    quantity: '',
    isbn: '',
  });

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


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book data:", bookData);
    // Send bookData to backend using Axios
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/books/add`, bookData)
      .then(response => {
        if (response.status === 200) {
          // Book added successfully
          console.log('Book added successfully');
          // Reset form fields
          setBookData({
            title: '',
            price: '',
            authorName: '',
            authorNationality: '',
            authorBirthDate: '',
            publisherName: '',
            publisherLocation: '',
            publishingYear: '',
            image: '',
            description: '',
            quantity: '',
            isbn: '',
          });
        } else {
          // Error adding book
          console.error('Error adding book');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>Add New Book</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                value={bookData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                value={bookData.price}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Author Name"
                name="authorName"
                fullWidth
                value={bookData.authorName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Author Nationality"
                name="authorNationality"
                fullWidth
                value={bookData.authorNationality}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Author Birth Date"
                name="authorBirthDate"
                type="date"
                fullWidth
                value={bookData.authorBirthDate}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Publisher Name"
                name="publisherName"
                fullWidth
                value={bookData.publisherName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Publisher Location"
                name="publisherLocation"
                fullWidth
                value={bookData.publisherLocation}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Publishing Year"
                name="publishingYear"
                type="number"
                fullWidth
                value={bookData.publishingYear}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Image URL"
                name="image"
                fullWidth
                value={bookData.image}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={4}
                value={bookData.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                fullWidth
                value={bookData.quantity}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="isbn"
                name="isbn"
                fullWidth
                value={bookData.ISBN}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">Add Book</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default AddBook;
