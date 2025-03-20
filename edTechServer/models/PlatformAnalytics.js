const { pool } = require('../config/db');

const PlatformAnalytics = {
    get: async () => {
        const totalUsers = await pool.query('SELECT COUNT(*) FROM users;');
        const totalCourses = await pool.query('SELECT COUNT(*) FROM courses;');
        const totalEnrollments = await pool.query('SELECT COUNT(*) FROM enrollments;');

        return {
            total_users: parseInt(totalUsers.rows[0].count),
            total_courses: parseInt(totalCourses.rows[0].count),
            total_enrollments: parseInt(totalEnrollments.rows[0].count),
        };
    },
};

module.exports = PlatformAnalytics;