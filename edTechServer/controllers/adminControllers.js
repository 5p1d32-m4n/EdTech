const User = require("../models/User");
const Course = require("../models/Course");
const PlatformAnalytics = require("../models/PlatformAnalytics");

/*
User management
*/

// Get all users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

// Get user by id
const getUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}
// Update user
const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { username, email, role } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user
        const udpatedUser = await User.update(userId, { username, email, role });
        res.status(200).json(udpatedUser);
    } catch (err) {
        next(err);
    }
}

// Delete user
const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Check if the user exists.
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user
        await User.delete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        next(err);
    }
}

/*
Course management
*/

// Get all courses
const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.findAll();
        res.status(200).json(courses);
    } catch (err) {
        next(err);
    }
};

// Get a specific course by ID
const getCourseById = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (err) {
        next(err);
    }
};

// Approve or reject a course
const approveCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const { status } = req.body; // 'approved' or 'rejected'

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Update the course status
        const updatedCourse = await Course.updateStatus(courseId, status);
        res.status(200).json(updatedCourse);
    } catch (err) {
        next(err);
    }
};

// Delete a course by ID
const deleteCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Delete the course
        await Course.delete(courseId);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        next(err);
    }
};

// Get platform analytics
const getPlatformAnalytics = async (req, res, next) => {
    try {
        const analytics = await PlatformAnalytics.get();
        res.status(200).json(analytics);
    } catch (err) {
        next(err);
    }
};

// TODO: Enrollment management

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getAllCourses,
    getCourseById,
    approveCourse,
    deleteCourse,
    getPlatformAnalytics,
};