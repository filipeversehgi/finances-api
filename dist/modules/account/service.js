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
exports.edit = async (userId, model) => {
    const modelId = model.id;
    delete model.id;
    model.updated_at = new Date().toISOString();
    const account = await Account_1.Account
        .query()
        .patch(model)
        .where("id", "=", modelId)
        .andWhere("user_id", "=", userId)
        .returning("*");
    return account;
};
exports.destroy = async (userId, modelId) => {
    if (typeof modelId !== "boolean"
        && !isNaN(modelId)) {
        const account = await Account_1.Account
            .query()
            .delete()
            .where("id", "=", modelId)
            .andWhere("user_id", "=", userId);
        if (account) {
            return account;
        }
        throw "Nothing was deleted";
    }
    throw "Invalid Account Id";
};
