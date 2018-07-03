import * as chai from "chai";
import { expect } from "chai";
import * as server from "../src/server";

export default function (authHeader, authHeaderB) {

    let testAccount: any;

    console.log("------------------");
    console.log(authHeader);
    console.log("------------------");

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

    return testAccount;

}
