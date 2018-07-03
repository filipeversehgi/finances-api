process.env.NODE_ENV = "test";

import { use } from "chai";
import * as chaiJwt from "chai-jwt";

// Test Files
import database from "./database.spec";
import auth from "./auth.spec";
import login from "./login.spec";
import account from "./account.spec";

var chaiAsPromised = require("chai-as-promised");

use(require("chai-http"));
use(chaiAsPromised);
use(chaiJwt);

let authHeader: any = {};
let authHeaderB: any = {};
let testAccount: any = {};

describe(":: Database", () => {
    database();
});

describe(":: Auth", () => {
    auth();
});

describe(":: Login", () => {
    [authHeader, authHeaderB] = login();
});

describe(":: Accounts", () => {
    testAccount = account(authHeader, authHeaderB);
});
