"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.addHook("onRequest", async (request, reply) => {});
});
