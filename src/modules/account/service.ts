import { Account } from "../../models/Account";
import { ITokenUser } from "../../interfaces/token";

export const create = async (model) => {
    const createdAccount = await Account.query().insertAndFetch(model);
    return createdAccount;
};

export const listAll = async (token: ITokenUser) => {
    const accounts = await Account.query().where("user_id", "=", token.id).orderBy("name");
    return accounts;
};

export const edit = async (token: ITokenUser, model) => {
    const modelId = model.id;
    delete model.id;
    model.updated_at = new Date().toISOString();

    // CHAMAR REPOSITORY
    const account = await Account
        .query()
        .patch(model)
        .where("id", "=", modelId)
        .andWhere("user_id", "=", token.id)
        .returning("*");
    return account;
};

export const destroy = async (token: ITokenUser, modelId) => {
    if (
        typeof modelId !== "boolean"
        && !isNaN(modelId)
    ) {
        const account = await Account
            .query()
            .delete()
            .where("id", "=", modelId)
            .andWhere("user_id", "=", token.id);

        if (account) { return account; }

        throw "Nothing was deleted";
    }
    throw "Invalid Account Id";
};
