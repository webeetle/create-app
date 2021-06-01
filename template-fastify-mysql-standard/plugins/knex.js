"use strict";

const fp = require("fastify-plugin");
module.exports = fp(
  async function (fastify, opts) {
    fastify.register(require("../client/fastify-knex"));
  },
  { name: "knex" }
);
