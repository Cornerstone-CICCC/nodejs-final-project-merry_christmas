"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = authenticateJWT;
const auth_1 = require("./auth");
function authenticateJWT(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const decoded = (0, auth_1.verifyToken)(token);
    if (!decoded) {
        res.status(403).json({ message: 'Invalid token' });
        return;
    }
    req.user = decoded; // Attach user payload to request
    next();
}
