const jwt = require("jsonwebtoken");
const config = require("../config/config");
require("dotenv").config();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const verifyToken = (token) =>{
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken };