const express = require("express");
const enrollmentController = require("../controllers/enrollmentControllers");
const { authenticate, authorize } = require("../middlewares/authMiddlewares");
// const {validateEnrollment} = require("../middlewares/validators");

const router = express.Router();

// Protected routes.(requires authontication)
router.use(authenticate);

// Student routes
router.post('/enrollments/:courseId/enroll', authorize(['students']), enrollmentController.enrollInCourse);
router.get('/enrollments', authorize(['students']), enrollmentController.viewEnrollments);

module.exports = router;