import * as dotenv from "dotenv";
dotenv.load();

import * as db from "./db";

import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";

import { auth } from "./middlewares/auth";

import { router } from "./router";
import { authRouter } from "./routes/auth";

db.connect();

const app = express();

app.use(bodyParser.json({limit: "5mb"}));

// if (process.env.NODE_ENV !== 'test') {
//     app.use(logger('dev'));
// }

app.use("/auth/", authRouter);

app.use(auth);

app.use("/v1/", router);

app.use((err, req, res, next) => {
    res.status(500).json({error: err });
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

module.exports = app;
