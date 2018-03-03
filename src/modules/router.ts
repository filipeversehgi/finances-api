import { NextFunction, Request, Response, Router } from "express";

export const router = Router({mergeParams: true});

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json("ok");
});
