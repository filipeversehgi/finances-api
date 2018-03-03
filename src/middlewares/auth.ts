import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (req.method === "OPTIONS") {
        return next();
    }

    if (!req.headers.authorization) {
        return res.status(403).json({ error: "No authorization present" });
    }

    const authHeaders = req.headers.authorization;
    console.log(authHeaders);

    try {
        const decoded = jwt.verify(authHeaders, "woeijoij424234d");
        console.dir(decoded);
        next();
    } catch (err) {
        return res.status(403).json({ error: "No authorization present" });
    }
};
