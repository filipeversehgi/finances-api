"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Knex = require("knex");
const Objection = require("objection");
const Model = Objection.Model;
const knex = Knex({
    client: "pg",
    connection: {
        host: "localhost",
        port: "5432",
        user: "root",
        password: "default",
        database: "finances-api"
    },
    useNullAsDefault: true
});
Model.knex(knex);
knex.raw("select 1+1 as result").then(() => {
    console.log("Database Connected!");
});
