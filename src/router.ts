import { NextFunction, Request, Response, Router } from "express";

import { accountRouter } from "./modules/account/router";
import { categoryRouter } from "./modules/category/router";
import { entryRouter } from "./modules/entry/router";

export const router = Router({mergeParams: true});

router.use("/accounts", accountRouter);
router.use("/categories", categoryRouter);
router.use("/entries", entryRouter);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json("ok");
});
