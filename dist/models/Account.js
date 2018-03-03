"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const User_1 = require("./User");
class Account extends objection_1.Model {
    static getTableName() {
        return "account";
    }
}
Account.relationMappings = {
    user: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: User_1.User,
        join: {
            from: "account.user_id",
            to: "user.id"
        }
    }
};
exports.Account = Account;
