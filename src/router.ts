import { NextFunction, Request, Response, Router } from "express";

import { accountRouter } from "./routes/account";
import { categoryRouter } from "./routes/category";

export const router = Router({mergeParams: true});

router.use("/accounts", accountRouter);
router.use("/categories", categoryRouter);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json("ok");
});
