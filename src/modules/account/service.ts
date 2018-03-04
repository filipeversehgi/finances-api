import { Account } from "../../models/Account";

export const create = async (model) => {
    const createdAccount = await Account.query().insertAndFetch(model);
    return createdAccount;
};

export const listAll = async (userId) => {
    const accounts = await Account.query().where("user_id", "=", userId).orderBy("name");
    return accounts;
};

export const edit = async (userId, model) => {
    const modelId = model.id;
    delete model.id;
    model.updated_at = new Date().toISOString();

    console.dir(model);
    console.log(modelId);

    const account = await Account
        .query()
        .patch(model)
        .where("id", "=", modelId)
        .andWhere("user_id", "=", userId)
        .returning("*");
    return account;
};

export const destroy = async (userId, modelId) => {
    if (
        typeof modelId !== "boolean"
        && !isNaN(modelId)
    ) {
        const account = await Account
            .query()
            .delete()
            .where("id", "=", modelId)
            .andWhere("user_id", "=", userId);

        if (account) { return account; }

        throw "Nothing was deleted";
    }
    throw "Invalid Account Id";
};
