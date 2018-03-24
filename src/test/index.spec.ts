process.env.NODE_ENV = "test";

import * as chaiAsPromised from "chai-as-promised";
import * as db from "../db";
import { expect, use } from "chai";

import * as server from "../server";
use(require("chai-http"));

use(chaiAsPromised);

describe("db", () => {
    it("should migrate postgres db", () => {
        return expect(db.connectAndMigrate()).to.be.eventually.fulfilled;
    });
});

describe("API Routes", () => {
    it("Should not be able to login", (done) => {
        chai.request(server)
        .post("/login")
        .send({
            "_method": "create",
            "username": "filipeversehgi@gmail.com",
            "password": "123"
        })
        .end((err, res) => {
            res.should.have.status(500);
            res.body[0].should.have.property("error");
            res.body[0].error.should.equal("Invalid password");
            done();
        });
    });
});
