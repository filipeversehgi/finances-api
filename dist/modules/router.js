"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = require("./user/routes");
exports.router = express_1.Router({ mergeParams: true });
exports.router.use("/users", routes_1.userRouter);
exports.router.get("/", (req, res, next) => {
    res.status(200).json("ok");
});
