const { pool } = require("../config/db");

const Course = {
    create: async (title, description, category, status) => {
        const query = `
            INSERT INTO courses (title, description, category, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *;`;

        const values = [title, description, category, status];
        const { rows } = await pool.query(query, values);
        rows[0];
    },

    findById: async (course_id) => {
        const query = `
            SELECT * FROM courses WHERE course_id = $1
        `;

        const { rows } = await pool.query(query, [course_id])
        return rows[0];
    },

    findAll: async () => {
        const query = `SELECT * FROM courses;`;

        const { rows } = await pool.query(query);

        return rows;
    },

    update: async (course_id, title, description, category, status) => {
        const query = `
            UPDATE courses
            SET title = $1, description = $2, category = $3, status = $4
            WHERE course_id = $5
            RETURNING *; -- Optional: Returns the updated row.
        `;

        const values = [title, description, category, status, course_id];
        const { rows } = await pool.query(query, values);
        return rows[0]; // Returns the updated course record.
    },

    updateStatus: async (status, course_id) => {
        const query = `
            UPDATE courses
            SET status = $1
            WHERE course_id = $2
            RETURNING *; -- Optional: Returns the updated row.
        `;
        const values = [status, course_id]
        const { rows } = await pool.query(query, values);
    },

    delete: async (courseId) => {
        try {
            await pool.query('DELETE FROM courses WHERE course_id = $1', [courseId]);
        } catch (err) {

        }
    }

}
module.exports = Course;