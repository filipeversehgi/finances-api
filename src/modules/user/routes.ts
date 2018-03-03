import { NextFunction, Request, Response, Router } from "express";
import * as userService from "./service";

export const userRouter = Router({mergeParams: true});

userRouter.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lists = await userService.listAll();
        res.status(200).json(lists);
    } catch (err) {
        next(err);
    }
});

userRouter.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newUser = await userService.create(req.body);
        res.status(200).json(newUser);
    } catch (err) {
        next(err);
    }
});

userRouter.post("/login", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = await userService.login(req.body);
        res.status(200).json(token);
    } catch (err) {
        next(err);
    }
});
