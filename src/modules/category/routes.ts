import { NextFunction, Request, Response, Router } from "express";
import * as categoryService from "./service";
import * as authService from "../auth/service";

export const categoryRouter = Router({mergeParams: true});


categoryRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const userId = authService.userId(req);
    try {
        const categories = await categoryService.listAll(userId);
        res.status(200).json(categories);
    } catch (err) {
        next(err);
    }
});

categoryRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.user_id = authService.userId(req);
        const category = await categoryService.create(req.body);
        res.status(200).json(category);
    } catch (err) {
        next(err);
    }
});

categoryRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await categoryService.destroy(authService.userId(req), req.params.id);
        res.status(200).json(category);
    } catch (err) {
        next(err);
    }
});

categoryRouter.put("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await categoryService.update(authService.userId(req), req.body);
        res.status(200).json(category);
    } catch (err) {
        next(err);
    }
});
