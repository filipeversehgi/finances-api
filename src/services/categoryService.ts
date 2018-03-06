import { Category } from "../models/Category";
import { ITokenUser } from "../interfaces/token";

export const listAll = async (token: ITokenUser) => {
    const categories = await Category
        .query()
        .select("id", "name", "color")
        .where("user_id", "=", token.id)
        .whereNull("parent_id")
        .orderBy("name")
        .eager("children");
    return categories;
};

export const create = async (model) => {
    const category = await Category.query().insertAndFetch(model);
    return category;
};

export const destroy = async (token: ITokenUser, id) => {
    const category = await Category.query().delete().where("id", "=", id).andWhere("user_id", "=", token.id);
    if (category) { return category; }
    throw "Nothing was deleted";
};

export const update = async (token: ITokenUser, model) => {
    const modelId = model.id;
    delete model.id;
    model.updated_at = new Date().toISOString();

    if (model.parent_id === modelId) {
        throw "Can't assign category to itself";
    }

    // Checks if Parent Category Belongs to User
    if (model.parent_id) {
        const parentCategory = await Category.query()
            .where("id", "=", model.parent_id)
            .andWhere("user_id", "=", token.id);
        console.dir(parentCategory);
        if (!parentCategory.length) {
            throw "Can't assign category to another user parent";
        }
    }

    const category = await Category.query().patch(model).where("id", "=", modelId).andWhere("user_id", "=", token.id).returning("*");
    return category;
};
