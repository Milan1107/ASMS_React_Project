const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token

    if (!token) {
        return res.status(401).json({ 
            message: "Authentication token is missing.", 
            success: false 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach decoded user info to request object
        console.log(req.headers.authorization)
        next();
    } catch (err) {
        return res.status(403).json({ 
            message: "Invalid or expired token.", 
            success: false 
        });
    }
};

module.exports = authenticateJWT;
