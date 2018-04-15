import { Model } from "objection";
import { User } from "./User";
import { Category } from "./Category";
import { Account } from "./Account";
import * as Joi from "joi";

export class Entry extends Model {
    public id: number;

    public user_id: number;
    public parent_id: number;
    public account_id: number;
    public category_id: number;

    public description: string;
    public amount: number;
    public date: Date;
    public type: string;
    public observation: string;
    public repeat: string;
    public installments: number;

    public created_at: Date;
    public updated_at: Date;

    static getTableName(): string {
        return "entries";
    }

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: "entries.user_id",
                to: "users.id"
            }
        },
        category: {
            relation: Model.BelongsToOneRelation,
            modelClass: Category,
            join: {
                from: "entries.category_id",
                to: "categories.id"
            }
        },
        account: {
            relation: Model.BelongsToOneRelation,
            modelClass: Account,
            join: {
                from: "entries.account_id",
                to: "accounts.id"
            }
        },
        parent: {
            relation: Model.BelongsToOneRelation,
            modelClass: Entry,
            join: {
                from: "entries.parent_id",
                to: "entries.id"
            }
        },
        children: {
            relation: Model.HasManyRelation,
            modelClass: Entry,
            filter: query => query.select("id", "description", "value"),
            join: {
                from: "entries.id",
                to: "entries.parent_id"
            }
        }
    };
}

export const categorySchema = Joi.object().keys({
    user_id: Joi.number().required().label("user_id"),
    name: Joi.string().required().label("name"),
    color: Joi.string().optional().label("color"),
    parent_id: Joi.number().optional().label("parent_id")
});
