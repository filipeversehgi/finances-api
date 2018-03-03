"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class User extends objection_1.Model {
    static getTableName() {
        return "user";
    }
}
exports.User = User;
