import { NextFunction, Request, Response, Router } from "express";
import * as authService from "../services/authService";

export const authRouter = Router({mergeParams: true});

authRouter.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newUser = await authService.create(req.body);
        res.status(200).json(newUser);
    } catch (err) {
        next(err);
    }
});

authRouter.post("/login", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = await authService.login(req.body);
        res.status(200).json(token);
    } catch (err) {
        next(err);
    }
});
