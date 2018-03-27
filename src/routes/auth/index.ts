import { NextFunction, Request, Response, Router } from "express";
import * as authService from "../../services/authService";
import * as joi from "joi";
import joiAsPromise from "../../functions/joi";

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
    const schema = joi.object().keys({
        email: joi.string().email().required().label("email"),
        password: joi.string().required().label("password")
    });

    try {
        await joiAsPromise(req.body, schema);
        const token = await authService.login(req.body);
        res.status(200).json(token);
    } catch (err) {
        next(err);
    }
});
