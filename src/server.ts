import * as dotenv from "dotenv";
dotenv.load();

import "./db";

import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";

import { auth } from "./middlewares/auth";

import { router } from "./modules/router";
import { authRouter } from "./modules/authRouter";

const app = express();

app.use(bodyParser.json({limit: "5mb"}));

app.use("/auth/", authRouter);

app.use(auth);

app.use("/v1/", router);

app.listen(3000, () => console.log("Example app listening on port 3000!"));
