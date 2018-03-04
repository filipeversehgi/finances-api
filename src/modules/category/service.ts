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
