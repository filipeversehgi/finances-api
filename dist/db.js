"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Knex = require("knex");
const Objection = require("objection");
const Model = Objection.Model;
const knex = Knex({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },
    useNullAsDefault: true
});
Model.knex(knex);
knex.raw("select 1+1 as result").then(() => {
    console.log("Database Connected!");
});
