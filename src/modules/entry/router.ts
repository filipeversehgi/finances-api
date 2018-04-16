import { Request, Response, NextFunction, Router } from "express";
import * as entryService from "./service";

export const entryRouter = Router({mergeParams: true});

entryRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pStartDate = req.params.startDate;
        const pEndDate = req.params.endDate;

        if(!pStartDate){
            throw "startDate missing";
        }

        if (!pEndDate) {
            throw "endDate missing";
        }

        const result = await entryService.list(req.token, pStartDate, pEndDate);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});
