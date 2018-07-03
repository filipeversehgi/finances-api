process.env.NODE_ENV = "test";
import * as db from "../src/db";
import { expect } from "chai";

export default function() {
    describe("Connect and Migrate", () => {
        it("should migrate postgres db", () => {
            return expect(db.connectAndMigrate()).to.be.eventually.fulfilled;
        });

        it("should delete all database content", () => {
            return expect(db.truncateTables()).to.be.eventually.fulfilled;
        });
    });

}

