import { Model } from "objection";
import { User } from "./User";

export class Account extends Model {
    public id: number;
    public user_id: number;
    public name: string;
    public type: string;
    public created_at: Date;
    public updated_at: Date;

    static getTableName(): string {
        return "account";
    }

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: "account.user_id",
                to: "user.id"
            }
        }
    };
}
