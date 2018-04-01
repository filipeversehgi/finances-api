process.env.NODE_ENV = "test";

import * as db from "../db";
import * as chai from "chai";
import { expect, use } from "chai";
import * as server from "../server";
import * as chaiJwt from "chai-jwt";

var chaiAsPromised = require("chai-as-promised");

use(require("chai-http"));
use(chaiAsPromised);
use(chaiJwt);

let authHeader: any = {};

describe("db", () => {
    it("should migrate postgres db", () => {
        return expect(db.connectAndMigrate()).to.be.eventually.fulfilled;
    });

    it("should delete all database content", () => {
        return expect(db.truncateTables()).to.be.eventually.fulfilled;
    });
});

describe("CREATE NEW USER", () => {
    it("Empty body test", (done) => {
        chai.request(server)
            .post("/auth")
            .end((err, res) => {
                expect(res.body).to.have.property("validationError");
                expect(res.body.message).to.be.equal("Invalid Data");
                done();
            });
    });

    it("Invalid data test", (done) => {
        chai.request(server)
            .post("/auth")
            .send({
                email: "filipeversehgi",
                password: "123"
            })
            .end((err, res) => {
                expect(res.body).to.have.property("validationError");
                expect(res.body.message).to.be.equal("Invalid Data");
                done();
            });
    });

    it("Success test", (done) => {
        chai.request(server)
            .post("/auth")
            .send({
                email: "test@test.com",
                password: "123"
            })
            .end((err, res) => {
                expect(res.body.email).to.be.equal("test@test.com");
                expect(res.body).to.have.property("last_login");
                expect(res.body).to.not.have.property("password");
                done();
            });
    });
});


describe("LOGIN", () => {
    it("Empty body test", (done) => {
        chai.request(server)
            .post("/auth/login")
            .end((err, res) => {
                expect(res.body).to.have.property("validationError");
                expect(res.body.message).to.be.equal("Invalid Data");
                done();
            });
    });

    it("Wrong user email", (done) => {
        chai.request(server)
        .post("/auth/login")
        .send({
            email: "wronguser@gmail.com",
            password: "123"
        })
        .end((err, res) => {
            expect(res.body).to.have.property("error");
            expect(res.body.error).to.be.equal("User not found");
            done();
        });
    });

    it("Wrong user password", (done) => {
        chai.request(server)
            .post("/auth/login")
            .send({
                email: "test@test.com",
                password: "wrongpass"
            })
            .end((err, res) => {
                expect(res.body).to.have.property("error");
                expect(res.body.error).to.be.equal("Invalid password");
                done();
            });
    });

    it("Success login", (done) => {
        chai.request(server)
            .post("/auth/login")
            .send({
                email: "test@test.com",
                password: "123"
            })
            .end((err, res) => {
                expect(res.body).to.have.property("token");
                expect(res.body.token).to.be.a.jwt;
                expect(res.body.token).to.not.be.signedWith("test");
                expect(res.body.token).to.be.signedWith(process.env.JWT_SECRET);
                authHeader = { "Authorization": res.body.token };
                done();
            });
    });
});

describe("ACCOUNTS", () => {
    it("List acounts and get nothing", (done) => {
        chai.request(server)
            .get("/v1/accounts")
            .set(authHeader)
            .end((err, res) => {
                expect(res.body).to.eql([]);
                done();
            });
    });
});
