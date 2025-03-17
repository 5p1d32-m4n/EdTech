const { body, validationResult } = require('express-validator');

// Validation rules for sigupn.
const validateSignup = [
    body('username').notEmpty().withMessage('Username is required!'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
];

// Validation rules for login
const validateLogin = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required.'),
];

// Middleware to handle validation errors.
const handleValidationErrors = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }
    next();
};

module.exports = {
    validateSignup: [...validateSignup, handleValidationErrors],
    validateLogin: [validateLogin, handleValidationErrors],
};