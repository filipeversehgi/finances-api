"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.router = express_1.Router({ mergeParams: true });
exports.router.get("/", (req, res, next) => {
    res.status(200).json("ok");
});
