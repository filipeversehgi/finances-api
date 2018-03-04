"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const User_1 = require("./User");
class Category extends objection_1.Model {
    static getTableName() {
        return "category";
    }
}
Category.relationMappings = {
    user: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: User_1.User,
        join: {
            from: "category.user_id",
            to: "user.id"
        }
    },
    parent: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
            from: "category.parent_id",
            to: "category.id"
        }
    },
    children: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Category,
        filter: query => query.select("id", "name", "color"),
        join: {
            from: "category.id",
            to: "category.parent_id"
        }
    }
};
exports.Category = Category;
