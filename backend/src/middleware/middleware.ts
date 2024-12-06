// src/middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './auth';

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        res.status(403).json({ message: 'Invalid token' });
        return
    }

    req.user = decoded; // Attach user payload to request
    next();
}
