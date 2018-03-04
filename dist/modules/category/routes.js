"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryService = require("./service");
const authService = require("../auth/service");
exports.categoryRouter = express_1.Router({ mergeParams: true });
exports.categoryRouter.get("/", async (req, res, next) => {
    const userId = authService.userId(req);
    try {
        const categories = await categoryService.listAll(userId);
        res.status(200).json(categories);
    }
    catch (err) {
        next(err);
    }
});
exports.categoryRouter.post("/", async (req, res, next) => {
    try {
        req.body.user_id = authService.userId(req);
        const category = await categoryService.create(req.body);
        res.status(200).json(category);
    }
    catch (err) {
        next(err);
    }
});
exports.categoryRouter.delete("/:id", async (req, res, next) => {
    try {
        const category = await categoryService.destroy(authService.userId(req), req.params.id);
        res.status(200).json(category);
    }
    catch (err) {
        next(err);
    }
});
exports.categoryRouter.put("/", async (req, res, next) => {
    try {
        const category = await categoryService.update(authService.userId(req), req.body);
        res.status(200).json(category);
    }
    catch (err) {
        next(err);
    }
});
