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
let authHeaderB: any = {};
let testAccount: any;

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



    it("Success test for user B", (done) => {
        chai.request(server)
            .post("/auth")
            .send({
                email: "test@second.com",
                password: "456"
            })
            .end((err, res) => {
                expect(res.body.email).to.be.equal("test@second.com");
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



    it("Success login for second user", (done) => {
        chai.request(server)
            .post("/auth/login")
            .send({
                email: "test@second.com",
                password: "456"
            })
            .end((err, res) => {
                expect(res.body).to.have.property("token");
                expect(res.body.token).to.be.a.jwt;
                expect(res.body.token).to.not.be.signedWith("test");
                expect(res.body.token).to.be.signedWith(process.env.JWT_SECRET);
                authHeaderB = { "Authorization": res.body.token };
                done();
            });
    });
});

describe("ACCOUNTS", () => {
    it("Auth error", (done) => {
        chai.request(server)
            .get("/v1/accounts")
            .end((err, res) => {
                expect(res.body.error).to.equal("No authorization present");
                done();
            });
    });

    it("List acounts and get nothing", (done) => {
        chai.request(server)
            .get("/v1/accounts")
            .set(authHeader)
            .end((err, res) => {
                expect(res.body).to.eql([]);
                done();
            });
    });

    it("Empty body test", (done) => {
        chai.request(server)
            .post("/v1/accounts")
            .set(authHeader)
            .end((err, res) => {
                expect(res.body).to.have.property("validationError");
                expect(res.body.message).to.be.equal("Invalid Data");
                done();
            });
    });

    it("Should not accept invalid type", (done) => {
        chai.request(server)
            .post("/v1/accounts")
            .set(authHeader)
            .send({
                name: "Poupança",
                type: "test"
            })
            .end((err, res) => {
                expect(res.body).to.have.property("validationError");
                expect(res.body.message).to.be.equal("Invalid Data");
                done();
            });
    });

    it("Should record initial account", (done) => {
        chai.request(server)
            .post("/v1/accounts")
            .set(authHeader)
            .send({
                name: "Banco",
                type: "checking"
            })
            .end((err, res) => {
                expect(res.body).to.have.property("name");
                expect(res.body).to.have.property("type");
                expect(res.body).to.have.property("user_id");
                expect(res.body.name).to.be.eql("Banco");
                expect(res.body.type).to.be.eql("checking");
                done();
            });
    });

    it("Should record saving account", (done) => {
        chai.request(server)
            .post("/v1/accounts")
            .set(authHeader)
            .send({
                name: "Poupança",
                type: "savings"
            })
            .end((err, res) => {
                expect(res.body).to.have.property("name");
                expect(res.body).to.have.property("type");
                expect(res.body).to.have.property("user_id");
                expect(res.body.name).to.be.eql("Poupança");
                expect(res.body.type).to.be.eql("savings");
                done();
            });
    });

    it("List acounts and get only two", (done) => {
        chai.request(server)
            .get("/v1/accounts")
            .set(authHeader)
            .end((err, res) => {
                expect(res.body.length).to.eql(2);
                done();
            });
    });

    it("Should record test account", (done) => {
        chai.request(server)
            .post("/v1/accounts")
            .set(authHeader)
            .send({
                name: "Conta 123",
                type: "checking"
            })
            .end((err, res) => {
                expect(res.body).to.have.property("name");
                expect(res.body).to.have.property("type");
                expect(res.body).to.have.property("user_id");
                expect(res.body.name).to.be.eql("Conta 123");
                expect(res.body.type).to.be.eql("checking");
                testAccount = res.body;
                done();
            });
    });

    it("Should update test account", (done) => {
        chai.request(server)
            .put("/v1/accounts")
            .set(authHeader)
            .send({
                id: testAccount.id,
                name: "Conta 456"
            })
            .end((err, res) => {
                expect(res.body).to.have.property("name");
                expect(res.body).to.have.property("type");
                expect(res.body).to.have.property("user_id");
                expect(res.body.name).to.be.eql("Conta 456");
                expect(res.body.type).to.be.eql("checking");
                done();
            });
    });

    it("Should try to change account user_id", (done) => {
        chai.request(server)
            .put("/v1/accounts")
            .set(authHeader)
            .send({
                id: testAccount.id,
                name: "Conta 789",
                user_id: testAccount.user_id + 1
            })
            .end((err, res) => {
                expect(res.body).to.have.property("name");
                expect(res.body).to.have.property("type");
                expect(res.body).to.have.property("user_id");
                expect(res.body.name).to.be.eql("Conta 789");
                expect(res.body.user_id).to.be.eql(testAccount.user_id);
                expect(res.body.type).to.be.eql("checking");
                done();
            });
    });

    it("List acounts and get only three", (done) => {
        chai.request(server)
            .get("/v1/accounts")
            .set(authHeader)
            .end((err, res) => {
                expect(res.body.length).to.eql(3);
                done();
            });
    });

    it("Should try delete test account with invalid user", (done) => {
        chai.request(server)
            .del("/v1/accounts/" + testAccount.id)
            .set(authHeaderB)
            .end((err, res) => {
                expect(res.body).to.have.property("error");
                expect(res.body.error).to.be.eql("Nothing was deleted");
                done();
            });
    });


    it("Should delete test account with correct user", (done) => {
        chai.request(server)
            .del("/v1/accounts/" + testAccount.id)
            .set(authHeader)
            .end((err, res) => {
                expect(res.body).to.be.eql(1);
                done();
            });
    });

    it("List acounts and get only two again", (done) => {
        chai.request(server)
            .get("/v1/accounts")
            .set(authHeader)
            .end((err, res) => {
                expect(res.body.length).to.eql(2);
                done();
            });
    });

    it("List acounts of the second user and get none", (done) => {
        chai.request(server)
            .get("/v1/accounts")
            .set(authHeaderB)
            .end((err, res) => {
                expect(res.body.length).to.eql(0);
                done();
            });
    });

    it("Should record initial account for second user", (done) => {
        chai.request(server)
            .post("/v1/accounts")
            .set(authHeaderB)
            .send({
                name: "Banco Segundo",
                type: "checking"
            })
            .end((err, res) => {
                expect(res.body).to.have.property("name");
                expect(res.body).to.have.property("type");
                expect(res.body).to.have.property("user_id");
                expect(res.body.name).to.be.eql("Banco Segundo");
                expect(res.body.type).to.be.eql("checking");
                done();
            });
    });

    it("List acounts of the second user and get 1", (done) => {
        chai.request(server)
            .get("/v1/accounts")
            .set(authHeaderB)
            .end((err, res) => {
                expect(res.body.length).to.eql(1);
                done();
            });
    });


});
