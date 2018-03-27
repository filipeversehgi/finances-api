
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", (t) => {
      t.increments('id').primary();
      t.string('email').notNullable();
      t.string('password').notNullable();
      t.string('recovery_token');
      t.date('last_login');
      t.timestamps(false, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
