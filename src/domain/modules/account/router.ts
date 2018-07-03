import { NextFunction, Request, Response, Router } from "express";
import * as accountService from "./service";
import { accountSchema } from "../../models/Account";
import joiAsPromise from "../../functions/joi";

export const accountRouter = Router({mergeParams: true});

accountRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accounts = await accountService.listAll(req.token);
        res.status(200).json(accounts);
    } catch (err) {
        next(err);
    }
});

accountRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.user_id = req.token.id;
        await joiAsPromise(req.body, accountSchema);
        const account = await accountService.create(req.body);
        res.status(200).json(account);
    } catch (err) {
        next(err);
    }
});

accountRouter.put("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await accountService.edit(req.token, req.body);
        res.status(200).json(account);
    } catch (err) {
        next(err);
    }
});

accountRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await accountService.destroy(req.token, req.params.id);
        res.status(200).json(account);
    } catch (err) {
        next(err);
    }
});
