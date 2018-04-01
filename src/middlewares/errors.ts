import { NextFunction, Request, Response } from "express";
import { isDevelopment } from "../settings";

export function notFound(req: Request, res: Response, next: NextFunction): any {
    return res.status(404).json("No Route Found");
}

export function parser(err: any, req: Request, res: Response, next: NextFunction): any {
    if (err.validationError) {
        if (isDevelopment()) {
            console.log(req.body);
            console.log(err.message);
        }

        return res.status(400).json({
            ...err,
            message: "Invalid Data"
        });
    }

    if (err.status < 100 || err.status >= 600 || !err.status) {
        err.status = 500;
    }

    res.status(err.status).send({error: err.message || "Internal Server Error"});

}


