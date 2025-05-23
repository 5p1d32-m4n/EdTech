const {Pool} = require("pg");
const config = require("./config")

const pool = new Pool ({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
    port: config.DB_PORT,
})

const connectDB = async ()=>{
    try{
        await pool.connect();
        console.log("Database connected successfully");
    } catch (err){
        console.log('Database connection error: ', err);
        process.exit(1);
    }
}

module.exports = {pool, connectDB};