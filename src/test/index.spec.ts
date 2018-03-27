process.env.NODE_ENV = "test";

import * as db from "../db";
import * as chai from "chai";
import { expect, use } from "chai";
import * as server from "../server";

var chaiAsPromised = require("chai-as-promised");

use(require("chai-http"));
use(chaiAsPromised);

describe("db", () => {
    it("should migrate postgres db", () => {
        return expect(db.connectAndMigrate()).to.be.eventually.fulfilled;
    });

    it("should delete all database content", () => {
        return expect(db.truncateTables()).to.be.eventually.fulfilled;
    });
});

describe("API Routes", () => {
    it("Should not be able to login", (done) => {
        chai.request(server)
        .post("/auth/login")
        .send({
            email: "filipeversehgi@gmail.com",
            password: "123"
        })
        .end((err, res) => {
            console.log(res.body);
            expect(res.body).to.have.property("error");
            expect(res.body.error).to.be.equal("User not found");
            done();
        });
    });
});
