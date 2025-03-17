const express = require('express');
const authController = require('../controllers/authControllers');
const { validateSignup, validateLogin } = require('../middlewares/validators');

const router = express.Router();

// Signup route
router.post('/signup', validateSignup, authController.signup);

// Login route
router.post('/login', validateLogin, authController.login);

// Logout route (optional, typically handle on the client side.)
router.post('/logout', authController.logout);

module.exports = router;