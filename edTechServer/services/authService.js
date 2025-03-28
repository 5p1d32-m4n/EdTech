const jwt = require("jsonwebtoken");
const config = require("../config/config");
require("dotenv").config();

const generateToken = (userId) => {
    // Validate inputs
    if(!userId || !process.env.JWT_SECRET){
        throw new Error('Missing required parameters for JWT generations.')
    }

    return jwt.sign(
        {   
            userId,
            iss: 'edtech-api',
            aud: 'edtech-client',
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1h',
            algorithm: 'HS256', // encryption algo
        }
    )
}

const verifyToken = (token) =>{
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken };