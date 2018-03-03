"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userService = require("./service");
exports.authRouter = express_1.Router({ mergeParams: true });
exports.authRouter.post("/", async (req, res, next) => {
    try {
        const newUser = await userService.create(req.body);
        res.status(200).json(newUser);
    }
    catch (err) {
        next(err);
    }
});
exports.authRouter.post("/login", async (req, res, next) => {
    try {
        const token = await userService.login(req.body);
        res.status(200).json(token);
    }
    catch (err) {
        next(err);
    }
});
