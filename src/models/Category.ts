import { Model } from "objection";
import { User } from "./User";

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
                from: "category.user_id",
                to: "user.id"
            }
        },
        parent: {
            relation: Model.BelongsToOneRelation,
            modelClass: Category,
            join: {
                from: "category.parent_id",
                to: "category.id"
            }
        },
        children: {
            relation: Model.HasManyRelation,
            modelClass: Category,
            filter: query => query.select("id", "name", "color"),
            join: {
                from: "category.id",
                to: "category.parent_id"
            }
        }
    };
}
