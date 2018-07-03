import { Model } from "objection";
import { User } from "./User";
import * as Joi from "joi";

export class Category extends Model {
    public id: number;
    public user_id: number;
    public parent_id: number;
    public name: string;
    public color: string;
    public created_at: Date;
    public updated_at: Date;

    static getTableName(): string {
        return "categories";
    }

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: "categories.user_id",
                to: "users.id"
            }
        },
        parent: {
            relation: Model.BelongsToOneRelation,
            modelClass: Category,
            join: {
                from: "categories.parent_id",
                to: "categories.id"
            }
        },
        children: {
            relation: Model.HasManyRelation,
            modelClass: Category,
            filter: query => query.select("id", "name", "color"),
            join: {
                from: "categories.id",
                to: "categories.parent_id"
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
