"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../../models/Category");
exports.listAll = async (userId) => {
    const categories = await Category_1.Category
        .query()
        .select("id", "name", "color")
        .where("user_id", "=", userId)
        .whereNull("parent_id")
        .orderBy("name")
        .eager("children");
    return categories;
};
exports.create = async (model) => {
    const category = await Category_1.Category.query().insertAndFetch(model);
    return category;
};
