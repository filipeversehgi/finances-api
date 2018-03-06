import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { ITokenUser } from "../interfaces/token";

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (req.method === "OPTIONS") {
        return next();
    }

    if (!req.headers.authorization) {
        return res.status(403).json({ error: "No authorization present" });
    }

    const authHeaders = req.headers.authorization;

    try {
        const decoded: ITokenUser = jwt.verify(authHeaders, process.env.JWT_SECRET);
        req.token = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid authorization" });
    }
};
