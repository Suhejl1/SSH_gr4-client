import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'; // Import useHistory and Link components
import './Login.css'; // Import a CSS file for styling
import bookImage from './book_store.jpg'; // Import the book image
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory(); // Initialize useHistory hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/signin`, {
        email,
        password
      });

      const token = response.data.token;
      console.log("THis is the token returned: " + token)
      const role = response.data.role;
      
      
      // Save token to local storage
      sessionStorage.setItem('token', token);
      console.log(sessionStorage.getItem('token'));
      sessionStorage.setItem('role',role);



      history.push('/home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(error.response.data || 'Invalid email or password');
      } else {
        setError(error.message || 'Login failed');
      }
    }
  };

  return (
    <div className="login-signup-container">
      {/* Add book image as background */}
      <img src={bookImage} alt="Book" className="book-background" />
      <div className="title-container">
        <h2 className="welcome-title">Welcome to our online bookstore</h2>
      </div>
      <div className="form-container">
        <h3>LogIn</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p> {/* Link to signup page */}
      </div>
    </div>
  );
};

export default Login;