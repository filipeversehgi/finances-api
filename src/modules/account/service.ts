import { Account } from "../../models/Account";

export const create = async (model) => {
    const createdAccount = await Account.query().insertAndFetch(model);
    return createdAccount;
};

export const listAll = async (userId) => {
    const accounts = await Account.query().where("user_id", "=", userId).orderBy("name");
    return accounts;
};
