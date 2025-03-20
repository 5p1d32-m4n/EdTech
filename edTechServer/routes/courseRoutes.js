const express = require('express');
const courseController = require('../controllers/courseControllers');

const router = express.Router();

// Course routes (non admin, i've got these in 'adminRoutes.js')
router.get('/courses', courseController.approvedCourse) // Get all 'approved courses'
