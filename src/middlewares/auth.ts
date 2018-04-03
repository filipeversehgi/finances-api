import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { ITokenUser } from "../interfaces/token";

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (req.method === "OPTIONS") {
        return next();
    }

    if (!req.headers.authorization) {
        res.status(401).json({ error: "No authorization present" });
        return;
    }

    try {
        const token = req.get("Authorization");
        if (!token) {
            throw "Invalid Authorizaton";
        }
        req.token = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        res.status(401).json({ error: "Invalid authorization" });
        return;
    } finally {
        next();
    }


    // const authHeaders = req.headers.authorization;

    // try {
    //     const decoded: ITokenUser = jwt.verify(authHeaders, process.env.JWT_SECRET);
    //     req.token = decoded;
    //     next();
    // } catch (err) {
    //     res.status(401).json({ error: "Invalid authorization" });
    //     return;
    // }

    //next();
};
