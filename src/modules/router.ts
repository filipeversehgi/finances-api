import { NextFunction, Request, Response, Router } from "express";
import { userRouter } from "./user/routes";

export const router = Router({mergeParams: true});

router.use("/users", userRouter);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json("ok");
});

