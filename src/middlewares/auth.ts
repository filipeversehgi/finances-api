import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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
    } catch (err) {
        return res.status(403).json({ error: "Invalid authorization" });
    }
};
