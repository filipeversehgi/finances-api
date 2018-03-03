"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./db");
const express = require("express");
const router_1 = require("./modules/router");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json({ limit: "5mb" }));
app.use("/v1/", router_1.router);
app.listen(3000, () => console.log("Example app listening on port 3000!"));
