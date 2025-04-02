const {Pool} = require("pg");
const {v4: uuidv4} = require("uuid");

// Test database configuration
const testConfig = {
    user: import.meta.env.DB_USER || 'admin',
    host: import.meta.env.DB_HOST || 'localhost',
    database: import.meta.env.DB_NAME || 'database',
    password: import.meta.env.DB_PASSWORD || 'password',
    port: import.meta.env.DB_PORT || 5000,
};

const pool = new Pool(testConfig);

// Test helper functions
const db = {
    query: (text, params) => pool.query(text, params),
    createTestUser: async (role = 'instructor') => {
        const id = uuidv4();
        await pool.query(
            'INSERT INTO users(email, password_hash, role) VALUES ($1, $2, $3 ) RETURNING user_id',
            [`test-${Date.now()}@example.com`, 'hashed_password', role]
        );
        return res.rows[0].user_id;
    },

    createTestCourse: async(instructorId) =>{
        const res = await pool.query(
            `INSERT INTO courses(title, instructor_id) VALUES ($1, $2) RETURNING course_id`,
            [`Test Course - ${Date.now()}`, instructorId]
        );
        return res.rows[0].course_id;
    },

    clearDatabase: async()=>{
        await pool.query('TRUNCATE TABLE courses, users, enrollments RESTART IDENTITY CASCADE');
    }
};