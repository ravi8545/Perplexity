import jwt from "jsonwebtoken";
import redis from "../config/cache.js";

export async function authUser(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            message: "Authentication token is missing",
            success: false
        });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized access",
            success: false,
            err: err.message
        });
    }

    try {
        const isTokenBlacklisted = await redis.get(token);

        if (isTokenBlacklisted) {
            return res.status(401).json({
                message: "Token is blacklisted",
                success: false
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Redis error",
            success: false,
            err: err.message
        });
    }

    req.user = decoded;
    next();
}