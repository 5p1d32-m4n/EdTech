const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (userId) => {
    return jwt.sign({userId}, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN
    })
}

module.exports = { generateToken };