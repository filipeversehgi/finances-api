"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = require("./account/routes");
const routes_2 = require("./category/routes");
exports.router = express_1.Router({ mergeParams: true });
exports.router.use("/accounts", routes_1.accountRouter);
exports.router.use("/categories", routes_2.categoryRouter);
exports.router.get("/", (req, res, next) => {
    res.status(200).json("ok");
});
