
exports.up = function(knex, Promise) {
  return knex.schema.createTable("category", (t) => {
    t.increments("id").primary();
    t.integer("user_id").notNullable();
    t.integer("parent_id");
    t.string("name").notNullable();
    t.string("color").default("#000000");
    t.foreign("user_id").references("id").inTable("user");
    t.foreign("parent_id").references("id").inTable("category");
    t.timestamps(false, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('category');
};
