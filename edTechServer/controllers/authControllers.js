const User = require('../models/User.js');
const {generateToken} = require("../services/authService.js");
const {hashPassword, comparePassword} = require("../utils/password.js");

const signup = async(req, res, next) =>{
    try {
        const {username, email, password} = req.body;
        const passwordHash = await hashPassword(password);
        const user = await User.create(username, email, passwordHash);
        const token = generateToken(user.user_id);
        res.status(201).json({ token });
    } catch (err) {
        next(err);
    }
}

const login = async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findByEmail(email);

        if(!user || !(await comparePassword(password, user.password_hash))){
            return res.status(401).json({ message: 'Invalid user credentials'});
        }
        const token = generateToken(user.user_id);
        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
}

const logout = async (req, res, next) => {
    try {
        // Invalidate the token (if using a token blacklist)
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = { signup, login, logout }