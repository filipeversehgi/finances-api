"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountService = require("./service");
const authService = require("../auth/service");
exports.accountRouter = express_1.Router({ mergeParams: true });
exports.accountRouter.post("/", async (req, res, next) => {
    try {
        req.body.user_id = authService.userId(req);
        const account = await accountService.create(req.body);
        res.status(200).json(account);
    }
    catch (err) {
        next(err);
    }
});
exports.accountRouter.get("/", async (req, res, next) => {
    try {
        const accounts = await accountService.listAll(authService.userId(req));
        res.status(200).json(accounts);
    }
    catch (err) {
        next(err);
    }
});
