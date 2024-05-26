import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Paper, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    image: '',
    description: '',
    quantity: '',
    isbn: '',
    genres: [], // Added genres field
  });

  const [genres, setGenres] = useState([]);
  const [booksByGenre, setBooksByGenre] = useState([]);

  useEffect(() => {
    // Fetch genres from the backend
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/genre`)
      .then(response => {
        setGenres(response.data);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });
  }, []);

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
        if (response.status === 201) {
          toast.success('Book added successfully');
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
            genres: [],
          });
        } else if (response.status === 409) {
          toast.error('Error: Book already exists');
        } else {
          toast.error('Unexpected response code: ' + response.status);
          console.error('Unexpected response code:', response.status);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          toast.error('Error: Book already exists');
        } else {
          toast.error('Error: Unable to add book');
          console.error('Error:', error);
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleGenreChange = (event) => {
    setBookData({ ...bookData, genres: event.target.value });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>Add New Book</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                value={bookData.title}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                name="price"
                value={bookData.price}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Author Name"
                name="authorName"
                value={bookData.authorName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Author Nationality"
                name="authorNationality"
                value={bookData.authorNationality}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Author Birth Date"
                name="authorBirthDate"
                value={bookData.authorBirthDate}
                onChange={handleChange}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Publisher Name"
                name="publisherName"
                value={bookData.publisherName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Publisher Location"
                name="publisherLocation"
                value={bookData.publisherLocation}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Publishing Year"
                name="publishingYear"
                value={bookData.publishingYear}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                name="image"
                value={bookData.image}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={bookData.description}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Quantity"
                name="quantity"
                value={bookData.quantity}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="ISBN"
                name="isbn"
                value={bookData.isbn}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="genres-label">Genres</InputLabel>
                <Select
                  labelId="genres-label"
                  id="genres"
                  multiple
                  value={bookData.genres}
                  onChange={handleGenreChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.name}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">Add Book</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ToastContainer />
    </div>
  );
};

export default AddBook;
