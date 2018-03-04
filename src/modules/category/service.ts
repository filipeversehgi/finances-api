import { Category } from "../../models/Category";

export const listAll = async (userId) => {
    const categories = await Category
        .query()
        .select("id", "name", "color")
        .where("user_id", "=", userId)
        .whereNull("parent_id")
        .orderBy("name")
        .eager("children");
    return categories;
};

export const create = async (model) => {
    const category = await Category.query().insertAndFetch(model);
    return category;
};

export const destroy = async (userId, id) => {
    const category = await Category.query().delete().where("id", "=", id).andWhere("user_id", "=", userId);
    if (category) { return category; }
    throw "Nothing was deleted";
};

export const update = async (userId, model) => {
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
            .andWhere("user_id", "=", userId);
        console.dir(parentCategory);
        if (!parentCategory.length) {
            throw "Can't assign category to another user parent";
        }
    }

    const category = await Category.query().patch(model).where("id", "=", modelId).andWhere("user_id", "=", userId).returning("*");
    return category;
};
