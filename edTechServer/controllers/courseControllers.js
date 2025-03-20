const Course = require("../models/Course");

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.findAll();
        res.status(200).json(courses);
    } catch (err) {
        next(err);
    }
}

const getCourseById = async (req, res, next) => {
    try {
        const courseId = req.params;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }
        res.status(200).json(course);
    } catch (err) {
        next(err);
    }
}

const createCourse = async (req, res, next) => {
    try {
        const { title, description, category } = req.body;
        const instructorId = req.user.userId;

        const course = await Course.create(title, description, category, instructorId);

        res.status(201).json(course);

    } catch (err) {
        next(err);
    }
}

const updateCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const { title, description, category } = req.body;
        const instructorId = req.user.userId;

        const course = await Course.findById(courseId);
        if (!course || course.instructor_id !== instructorId) {
            return res.status(403).json({ message: 'Not authorized to update the course' });
        }

        const updatedCourse = await Course.update(courseId, title, description, category);

        res.status(200).json(updatedCourse);
    } catch (err) {
        next(err);
    }
}

// delete course (instructor specific one)
const deleteCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const instructorId = req.user.userId; //THIS IS FROM THE AUTHENTICATED USER!!!!!

        // Check if this is the instructors course.
        const course = await Course.findById(courseId);
        if (!course || course.instructor_id !== instructorId) {
            return res.status(403).json({ message: 'Not authorized to delete course.' });
        }

        await Course.delete(courseId);

        res.status(200).json({ message: 'Course deleted successfully.' });
    } catch (err) {
        next(err)
    }
}

// Approve/reject a course (admin only)
const approvedCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const { status } = req.body;

        const course = await Course.updateStatus(courseId, status);

        res.status(200).json(course);
    } catch (err) {
        next(err);
    }
}

module.exports = { getAllCourses, getCourseById, createCourse, deleteCourse, updateCourse, approvedCourse };