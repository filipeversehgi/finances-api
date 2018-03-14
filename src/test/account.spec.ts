import * as category from "../services/categoryService";
import { expect } from "chai";
import "mocha";

describe("List Categories", () => {
    it("should return hello world", () => {
        const result = category.listAll();
        expect(result).to.equal("Hello world!");
    });
});
