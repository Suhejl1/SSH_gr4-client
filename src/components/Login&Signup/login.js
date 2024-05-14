import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'; // Import useHistory and Link components
import './Login.css'; // Import a CSS file for styling
import bookImage from './book_store.jpg'; // Import the book image

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory(); // Initialize useHistory hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement authentication logic here (e.g., send login request to server)

    // Redirect to "/home" path on successful login
    history.push('/home');
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