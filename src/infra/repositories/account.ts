import { Account } from "../database/models/Account";

export class AccountRepository {
    public async list(userId: string): Promise<Account[]> {
        return await Account.query()
            .where("user_id", userId)
            .orderBy("name");
    }
}