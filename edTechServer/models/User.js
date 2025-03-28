const { pool } = require("../config/db");

const User = {
    create: async (username, email, passwordHash, role='student') => {
        const query = `
            INSERT INTO users (username, email, password_hash, role)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [username, email, passwordHash, role];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    findAll: async () => {
        const query = `SELECT * FROM users WHERE deleted`;
        const { rows } = await pool.query(query);
        return rows;
    },

    findById: async (userId) => {
        const { row } = await pool.query(`SELECT * FROM users WHERE user_id = $1;`, [userId]);
        return row[0];
    },

    update: async (userId, { username, email, role }) => {
        const { rows } = await pool.query(
            `UPDATE users SET username = $1, email = $2, role = $3 WHERE user_id = $4 RETURNING *;`,
            [username, email, role, userId]
        );
        return rows[0];
    },

    findByEmail: async (email) => {
        const query = `SELECT * FROM users WHERE email = $1`;
        const { rows } = await pool.query(query, [email]);
        return rows[0];
    },

    delete: async (userId) => {
        await pool.query(`DELETE FROM users WHERE user_id = $1;`, [userId]);
    }
}

module.exports = User;