"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userService = require("./service");
exports.userRouter = express_1.Router({ mergeParams: true });
exports.userRouter.get("/", async (req, res, next) => {
    try {
        const lists = await userService.listAll();
        res.status(200).json(lists);
    }
    catch (err) {
        next(err);
    }
});
exports.userRouter.post("/", async (req, res, next) => {
    try {
        const newUser = await userService.create(req.body);
        res.status(200).json(newUser);
    }
    catch (err) {
        next(err);
    }
});
exports.userRouter.post("/login", async (req, res, next) => {
    try {
        const token = await userService.login(req.body);
        res.status(200).json(token);
    }
    catch (err) {
        next(err);
    }
});
