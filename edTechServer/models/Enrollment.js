const { pool } = require("../config/db");

const Enrollment = {
    create: async (studentId, courseId) => {
        const query = `
            INSERT INTO enrollments (student_id, course_id)
            VALUES ($1, $2)
            ON CONFLICT (student_id, course_id) DO NOTHING
            RETURNING enrollmentL_id;
        `;
        const values = [studentId, courseId];
        const { rows } = await pool.query(query, values)
        return rows[0];
    },
    findAll: async () => {
        const query = `
            SELECT * FROM enrollments;
        `;
        const { rows } = await pool.query(query)
        return rows;
    },
    findByStudentAndCourse: async (studnetId, courseId) => {
        const query = `
            SELECT * FROM enrollments WHERE student_id = $1 AND WHERE course_id = $2;
        `;
        const { rows } = await pool.query(query, [studnetId, courseId]);
        return rows;
    },
    findByStudent: async (studnetId) => {
        const query = `
            SELECT * FROM enrollments WHERE student_id = $1;
        `;
        const { rows } = await pool.query(query, [studnetId]);
        return rows;
    },
    // markCompleted: async () => { },
    // updateStatus: async () => { },

}

module.exports = Enrollment;