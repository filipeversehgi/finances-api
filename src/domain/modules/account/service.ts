import { Account } from "../../models/Account";
import { ITokenUser } from "../../interfaces/token";
import validationError from "../../functions/validationError";
import { Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller } from "tsoa";

@Route("Accounts")
export class AccountController extends Controller {
    @Get()
    public async listAll(token: ITokenUser): Promise<Account[]> {
        const accounts = await Account.query().where("user_id", "=", token.id).orderBy("name");
        return accounts;
    }
}

export const create = async (model) => {
    const createdAccount = await Account.query().insertAndFetch(model);
    return createdAccount;
};

export const edit = async (token: ITokenUser, model) => {
    const modelId = model.id;
    delete model.id;
    delete model.user_id;
    model.updated_at = new Date().toISOString();

    // CHAMAR REPOSITORY
    const account = await Account
        .query()
        .patch(model)
        .where("id", "=", modelId)
        .andWhere("user_id", "=", token.id)
        .returning("*");
    return account[0];
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

        throw validationError(400, "Nothing was deleted");
    }
    throw validationError(400, "Invalid account i");
};
