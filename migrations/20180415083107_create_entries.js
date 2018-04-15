
exports.up = function(knex, Promise) {
    return knex.schema.createTable("entries", (t) => {
        t.increments("id").primary();

        t.integer("user_id").notNullable();
        t.integer("parent_id").notNullable();
        t.integer("account_id").notNullable();
        t.integer("category_id").notNullable();

        t.string("description").notNullable();
        t.decimal("amount", 14, 2).notNullable();
        t.date("date").notNullable();

        t.enu("type", ["input", "output", "transfer"]).notNullable();

        t.string("observation");

        t.enu("repeat", ["fixed", "installments"]);
        t.integer("installments");

        t.foreign("user_id").references("id").inTable("users");
        t.foreign("account_id").references("id").inTable("accounts");
        t.foreign("category_id").references("id").inTable("categories");
        t.foreign("parent_id").references("id").inTable("entries");

        t.timestamps(false, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("entries");
};
