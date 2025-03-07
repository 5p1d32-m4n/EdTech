const { verifyToken } = require("../services/authService");

const authenticate = (req, res, next)=>{
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token){
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next()
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
}

const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.roles)){
        return res.status(403).json({ message: 'Access denied.' });
    }
    next();
}

module.exports = {authenticate, authorize};