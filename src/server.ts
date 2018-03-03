import "./db";

import * as express from "express";
import { router } from "./modules/router";
import * as bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json({limit: "5mb"}));

app.use("/v1/", router);

app.listen(3000, () => console.log("Example app listening on port 3000!"));
