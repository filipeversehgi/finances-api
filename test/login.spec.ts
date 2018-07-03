import * as chai from "chai";
import { expect } from "chai";
import * as server from "../src/server";

export default function() {
    let authHeader: any = {};
    let authHeaderB: any = {};

    describe("Login", () => {
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

    return [authHeader, authHeaderB ];
}
