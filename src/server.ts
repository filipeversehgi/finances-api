import * as dotenv from "dotenv";
dotenv.load();

import * as db from "./db";

import * as express from "express";
import * as bodyParser from "body-parser";
import { authMiddleware } from "./infra/middlewares/auth";
import * as errors from "./infra/middlewares/errors";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDoc from "./app/swagger/swagger.json";
//import { authRouter } from "./app/controllers/authController";
import { Server, HttpError } from "typescript-rest";
import { controllers } from "./app/controllers";

db.connect();

const app = express();

app.use(bodyParser.json({limit: "5mb"}));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(authMiddleware);

// app.use("/auth", authMiddleware);
// app.use("/v1", authMiddleware);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

Server.buildServices(app, ...controllers);
app.use(errors.notFound);
app.use(errors.parser);

//app.use("/v1", router);


let port = process.env.NODE_ENV === "test" ? 4545 : 3000;
app.listen(port, () => console.log("Example app listening on port " + port + "!"));

module.exports = app;
