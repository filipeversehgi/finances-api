import * as dotenv from "dotenv";
dotenv.load();
// Update with your config settings.

module.exports = {
  client: "postgresql",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "admin_schema_version"
  }
};
