"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = require("../../models/Account");
exports.create = async (model) => {
    const createdAccount = await Account_1.Account.query().insertAndFetch(model);
    return createdAccount;
};
exports.listAll = async (userId) => {
    const accounts = await Account_1.Account.query().where("user_id", "=", userId).orderBy("name");
    return accounts;
};
