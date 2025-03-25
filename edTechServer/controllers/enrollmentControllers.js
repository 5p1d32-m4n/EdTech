const Enrollment = require("../models/Enrollment");
const Progress = require("../models/Progress");

// Enroll in a course (student only)
const enrollInCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const studentId = req.user.userId;

        // check if the student is already enrolled.
        const existingEnrollment = await Enrollment.findByStudentAndCourse(studentId, courseId);

        if (existingEnrollment) {
            return res.status(400).json({ message: 'Already enrolled in course.' });
        }

        const enrollment = await Enrollment.create(studentId, courseId);

        res.status(201).json(enrollment);
    } catch (err) {
        next(err);
    }
}

const markLessonCompleted = async (req, res, next) => {
    try {
        const { lessonId } = req.params;
        const studentId = req.user.userId; // From authenticated user.

        const progress = await Progress.markCompleted(studentId, lessonId);

        res.status(200).json(progress);
    } catch (err) {
        next(err);
    }
}

const viewEnrollments = async (req, res, next) => {
    try {
        const {studentId} = req.user.userId; // From the authenticated user.
        const [enrollments] = await Enrollment.findByStudent(studentId);

        res.status(200).json(enrollments);
    } catch (err) {
        next(err);
    }
}

module.exports = { markLessonCompleted, enrollInCourse, viewEnrollments };