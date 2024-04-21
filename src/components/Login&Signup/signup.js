import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom'; // Import useHistory and Link components
import './Login.css'; // Import a CSS file for styling
import bookImage from './book_store.jpg'; // Import the book image
import { validateUsername, validatePassword } from './validation'; // Import validation functions

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [formTopPosition, setFormTopPosition] = useState(50); // Default top position
    const [welcomeTopPosition, setWelcomeTopPosition] = useState(0); // Default top position for welcome text
    const history = useHistory(); // Initialize useHistory hook

    useEffect(() => {
        // Calculate the top position for the form container based on the height of the window
        const windowHeight = window.innerHeight;
        const formContainerHeight = document.querySelector('.form-container').offsetHeight;
        const calculatedFormTopPosition = (windowHeight - formContainerHeight) / 2;
        setFormTopPosition(calculatedFormTopPosition);

        // Calculate the top position for the welcome text to ensure visibility
        const titleHeight = document.querySelector('.welcome-title').offsetHeight;
        const calculatedWelcomeTopPosition = (windowHeight - formContainerHeight - titleHeight) / 2;
        setWelcomeTopPosition(calculatedWelcomeTopPosition);
    }, []); // Run this effect only once after initial render

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate username
        const usernameError = validateUsername(username);
        if (usernameError) {
            setError(usernameError);
            return;
        }

        // Validate password
        const passwordError = validatePassword(password);
        if (!passwordError) {
            setError('Your password must be at least 8 characters long, contain at least one number, one uppercase letter and one symbol.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Implement registration logic here (e.g., send registration request to server)

        // Redirect to "/home" path on successful registration
        history.push('/home');
    };

    return (
        <div className="login-signup-container">
            {/* Add book image as background */}
            <img src={bookImage} alt="Book" className="book-background" />
            <div className="title-container" style={{ top: `${welcomeTopPosition}px` }}>
                <h2 className="welcome-title">Welcome to our online bookstore</h2>
            </div>
            <div className="form-container" style={{ top: `${formTopPosition}px` }}>
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
                <p>Already have an account? <Link to="/">Log In</Link></p> {/* Link to login page */}
            </div>
        </div>
    );
};

export default SignUp;
