const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../constant/constant');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required');

    const modifiedToken = token.replace('Bearer ', '')

    jwt.verify(modifiedToken, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        req.user = decoded; // Attach user data to request
        next();
    });
};

module.exports = verifyToken;