import { NextFunction, Request, Response, Router } from "express";
import * as accountService from "./service";
import * as authService from "../auth/service";

export const accountRouter = Router({mergeParams: true});

accountRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.user_id = authService.userId(req);
        const account = await accountService.create(req.body);
        res.status(200).json(account);
    } catch (err) {
        next(err);
    }
});

accountRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accounts = await accountService.listAll(authService.userId(req));
        res.status(200).json(accounts);
    } catch (err) {
        next(err);
    }
});
