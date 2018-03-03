
exports.up = function(knex, Promise) {
  return knex.schema.createTable("account", (t) => {
      t.increments("id").primary();
      t.integer("user_id").notNullable();
      t.string("name").notNullable();
      t.enu("type", ["savings", "checking"]).notNullable();
      t.foreign("user_id").references("id").inTable("user");
      t.timestamps(false, true);
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('account');
};