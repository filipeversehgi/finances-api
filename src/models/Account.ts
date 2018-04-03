import { Model } from "objection";
import { User } from "./User";
import * as Joi from "joi";

export class Account extends Model {
    public id: number;
    public user_id: number;
    public name: string;
    public type: string;
    public created_at: Date;
    public updated_at: Date;

    static getTableName(): string {
        return "accounts";
    }

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: "accounts.user_id",
                to: "users.id"
            }
        }
    };
}

export const accountSchema = Joi.object().keys({
    user_id: Joi.number().required().label("user_id"),
    name: Joi.string().required().label("name"),
    type: Joi.string().required().valid("savings", "checking").label("type")
});
