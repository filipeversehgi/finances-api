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
exports.destroy = async (userId, id) => {
    const category = await Category_1.Category.query().delete().where("id", "=", id).andWhere("user_id", "=", userId);
    if (category) {
        return category;
    }
    throw "Nothing was deleted";
};
exports.update = async (userId, model) => {
    const modelId = model.id;
    delete model.id;
    model.updated_at = new Date().toISOString();
    if (model.parent_id === modelId) {
        throw "Can't assign category to itself";
    }
    // Checks if Parent Category Belongs to User
    if (model.parent_id) {
        const parentCategory = await Category_1.Category.query()
            .where("id", "=", model.parent_id)
            .andWhere("user_id", "=", userId);
        console.dir(parentCategory);
        if (!parentCategory.length) {
            throw "Can't assign category to another user parent";
        }
    }
    const category = await Category_1.Category.query().patch(model).where("id", "=", modelId).andWhere("user_id", "=", userId).returning("*");
    return category;
};
