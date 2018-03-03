// Update with your config settings.

module.exports = {
  client: "postgresql",
  connection: {
    host: "localhost",
    port: "5432",
    user: "root",
    password: "default",
    database: "finances-api"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "admin_schema_version"
  }
};
