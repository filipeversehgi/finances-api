
exports.up = function(knex, Promise) {
  return knex.schema.createTable("categories", (t) => {
    t.increments("id").primary();
    t.integer("user_id").notNullable();
    t.integer("parent_id");
    t.string("name").notNullable();
    t.string("color").default("#000000");
    t.foreign("user_id").references("id").inTable("users");
    t.foreign("parent_id").references("id").inTable("categories");
    t.timestamps(false, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('categories');
};
