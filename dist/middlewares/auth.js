"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
exports.auth = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    req.session.token = false;
    if (!req.headers.authorization) {
        return res.status(403).json({ error: "No authorization present" });
    }
    const authHeaders = req.headers.authorization;
    try {
        const decoded = jwt.verify(authHeaders, process.env.JWT_SECRET);
        req.session.token = decoded;
        next();
    }
    catch (err) {
        return res.status(403).json({ error: "Invalid authorization" });
    }
};
