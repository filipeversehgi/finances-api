import { Request, Response, NextFunction, Router } from "express";
import * as entryService from "./service";
import validationError from "../../functions/validationError";
import { newEntrySchema, newInstallmentEntrySchema } from "../../models/Entry";
import joiAsPromise from "../../functions/joi";

export const entryRouter = Router({mergeParams: true});

entryRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pStartDate = req.query.startDate;
        const pEndDate = req.query.endDate;

        if (!pStartDate) {
            throw validationError(400, "startDate is missing");
        }

        if (!pEndDate) {
            throw validationError(400, "endDate is missing");
        }

        const result = await entryService.list(req.token, pStartDate, pEndDate);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

entryRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.user_id = req.token.id;
        await joiAsPromise(req.body, newEntrySchema);
        const result = await entryService.create(req.body);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});
