const jwt = require("jsonwebtoken");
const { verifyToken } = require("../services/authService");

const authenticate = (req, res, next)=>{
    // 1. Get the token from the header.
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token){
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        // 2. verify the token.
        const decoded = verifyToken(token);

        // 3. attach user to request.
        req.user = {
            // Add the claims i need.
            userId: decoded.userId,
            role: decoded.roles
        };
        next()
    } catch (err) {
        res.status(400).json({
            message: 'Invalid token.',
            error: err.message
         });
    }
}

const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.roles)){
        return res.status(403).json({ message: 'Access denied.' });
    }
    next();
}

module.exports = {authenticate, authorize};