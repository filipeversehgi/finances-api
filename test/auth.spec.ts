import * as server from "../src/server";
import * as chai from "chai";
import { expect } from "chai";

export default function() {
    describe("Create New User", () => {
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

        it("Login successfully with user A", (done) => {
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


        it("Login successfully with user B", (done) => {
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
}
