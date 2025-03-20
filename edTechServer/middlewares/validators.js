const { body, validationResult } = require('express-validator');

// Validation rules for sigupn.
const validateSignup = [
    body('username')
        .notEmpty().withMessage('Username is required!')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
    body('email')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('Password must containa at least one number'),
];

// Validation rules for login
const validateLogin = [
    body('email')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required.'),
];

// Validation for course creation, updte and delete
const validateCourse = [
    body('title')
        .notEmpty().withMessage('Title is required!')
        .isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long.'),
    body('category')
        .notEmpty().withMessage('Category is required!'),
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
    validateCourse: [validateCourse, handleValidationErrors],
};