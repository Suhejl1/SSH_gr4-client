// validation.js

export const validateUsername = (username) => {
    // Check if username meets length requirements
    const minLength = 5;
    const maxLength = 20;
    if (username.length < minLength || username.length > maxLength) {
        return `Username must be between ${minLength} and ${maxLength} characters long`;
    }

    // If username length is within the acceptable range, return null (indicating no validation error)
    return null;
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
};
