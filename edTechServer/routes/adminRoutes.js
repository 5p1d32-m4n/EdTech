const express = require('express');
const adminController = require('../controllers/adminControllers');
const { authenticate, authorize } = require('../middlewares/authMiddlewares');

const router = express.Router();

// Protect all admin routs with authentication and authorization.
router.use(authenticate); // Ensure the user is logged in.
router.use(authorize(['admin'])); // Ensure the user has the 'admin' role.

// User management routes
router.get('/users', adminController.getAllUsers); // Get all users
router.get('/users/:userId', adminController.getUserById); // Get all users
router.put('/users/:userId', adminController.updateUser); // Get all users
router.delete('/users/:userId', adminController.deleteUser); // Get all users

//Course management ** use courses not enrollments
router.get('/courses', adminController.getAllCourses); // Get all users
router.get('/courses/:courseId', adminController.getCourseById); // Get all users
router.put('/courses/:courseId/approve', adminController.approveCourse); // Get all users
router.delete('/courses/:courseId', adminController.deleteCourse); // Delete course

// Platform analytics routes
router.get('/analytics', adminController.getPlatformAnalytics); // Get platform analytics

module.exports = router;