import { Model } from "objection";
import { User } from "./User";
import { Category } from "./Category";
import { Account } from "./Account";
import * as Joi from "joi";

export class Entry extends Model {
    public id: number;

    public user_id: number;
    public account_id: number;
    public category_id: number;

    public group_hash: number;
    public group_order: number;

    public description: string;
    public income: number;
    public outcome: number;
    public date: Date;
    public type: string;
    public observation: string;
    public repeat: string;
    public installments: number;

    public period: string;
    public period_size: number;
    public is_paid: boolean;

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
        }
    };
}

export const newEntrySchema = Joi.object().keys({
    user_id: Joi.number().required(),
    account_id: Joi.number().required(),
    category_id: Joi.number().required(),

    //group_hash: Joi.string().required(),
    //  group_order: Joi.number().required(),

    description: Joi.string().required(),
    income: Joi.number().required(),
    outcome: Joi.number().required(),
    date: Joi.date().required(),
    //type: Joi.string().valid("input", "output", "transfer").required(),
    observation: Joi.string().optional(),
    repeat: Joi.string().valid("fixed", "installments").optional(),
    installments: Joi.number().optional(),
    period: Joi.string().valid("day", "month", "week", "year").optional(),
    period_size: Joi.number().optional(),
    is_paid: Joi.boolean().optional()
});
