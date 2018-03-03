import * as express from "express";
import { router } from "./modules/router";

const app = express();

app.use("/v1/", router);

app.listen(3000, () => console.log("Example app listening on port 3000!"));
