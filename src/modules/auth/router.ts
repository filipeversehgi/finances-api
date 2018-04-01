import { NextFunction, Request, Response, Router } from "express";
import * as authService from "./service";
import * as joi from "joi";
import joiAsPromise from "../../functions/joi";
import { userSchema } from "../../models/User";

export const authRouter = Router({mergeParams: true});

authRouter.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await joiAsPromise(req.body, userSchema);
        const newUser = await authService.create(req.body);
        res.status(200).json(newUser);
    } catch (err) {
        next(err);
    }
});

authRouter.post("/login", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await joiAsPromise(req.body, userSchema);
        const token = await authService.login(req.body);
        res.status(200).json(token);
    } catch (err) {
        next(err);
    }
});
