import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import './signup.css'; // Import a CSS file for styling
import bookImage from './book_store.jpg'; // Import the book image

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory(); // Initialize useHistory hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Implement registration logic here (e.g., send registration request to server)

        // Redirect to "/home" path on successful registration
        history.push('/home');
    };

    return (
        <div className="login-container">
            {/* Add book image as background */}
            <img src={bookImage} alt="Book" className="book-background" />
            <div className="title-container">
                <h2 className="welcome-title">Welcome to our online bookstore</h2>
            </div>
            <div className="form-container">
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default SignUp;
