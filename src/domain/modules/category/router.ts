import { NextFunction, Request, Response, Router } from "express";
import * as categoryService from "./service";
import { categorySchema } from "../../models/Category";
import * as authService from "../../modules/auth/service";
import joiAsPromise from "../../functions/joi";

export const categoryRouter = Router({mergeParams: true});


categoryRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await categoryService.listAll(req.token);
        res.status(200).json(categories);
    } catch (err) {
        next(err);
    }
});

categoryRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.user_id = req.token.id;
        await joiAsPromise(req.body, categorySchema);
        const category = await categoryService.create(req.body);
        res.status(200).json(category);
    } catch (err) {
        next(err);
    }
});

categoryRouter.put("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await categoryService.update(req.token, req.body);
        res.status(200).json(category);
    } catch (err) {
        next(err);
    }
});

categoryRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await categoryService.destroy(req.token, req.params.id);
        res.status(200).json(category);
    } catch (err) {
        next(err);
    }
});
