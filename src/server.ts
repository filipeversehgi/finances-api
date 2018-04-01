import * as dotenv from "dotenv";
dotenv.load();

import * as db from "./db";

import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import { auth } from "./middlewares/auth";
import { router } from "./router";
import { authRouter } from "./modules/auth/router";
import * as errors from "./middlewares/errors";

db.connect();

const app = express();

app.use(bodyParser.json({limit: "5mb"}));

app.use("/auth/", authRouter);

app.use(auth);

app.use("/v1", router);

app.use(errors.notFound);
app.use(errors.parser);

let port = process.env.NODE_ENV === "test" ? 4545 : 3000;
app.listen(port, () => console.log("Example app listening on port " + port + "!"));

module.exports = app;
