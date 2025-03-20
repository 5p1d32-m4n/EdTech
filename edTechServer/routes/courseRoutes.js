const express = require("express");
const courseController = require("../controllers/courseControllers");
const { authenticate, authorize } = require("../middlewares/authMiddlewares");
const { validateCourse } = require("../middlewares/validators");

const router = express.Router();

// Public routes (no authentication, so anyone can vieww courses.)
router.get('/', courseController.getAllCourses); // Get all courses.
router.get('/:courseId', courseController.getCourseById);

//Protected routes (requires authentication * might need admin ver? *)
router.use(authenticate);

// Instructor only routes
router.post('/', authorize(['instructor']), validateCourse, courseController.createCourse);
router.put('/:courseId', authorize(['instructor']), validateCourse, courseController.updateCourse);
router.delete('/:courseId', authenticate(['instructor']), courseController.deleteCourse);

// Students only routes
router.post('/:courseId/enroll', authenticate(['student']), courseController.enrollCourse);

module.exports = router;