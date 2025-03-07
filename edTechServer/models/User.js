const { pool } = require("../config/db");

const User = {
    create: async(username, email, passwordHash) => {
        const query = `
            INSERT INTO user (username, email, passwordHash)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [username, email, passwordHash];
        const {rows} = await pool.query(query, values);
        return rows[0];
    },

    findByEmail: async(email)=>{
        const query = `SELECT * FROM users WHERE email = $1`;
        const {rows} = await pool.query(query, [email]);
        return rows[0];
    }
}

module.exports = User;