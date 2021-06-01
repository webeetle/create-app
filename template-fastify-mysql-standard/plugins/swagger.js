"use strict";

const fp = require("fastify-plugin");

module.exports = fp(
  async function (fastify, opts) {
    fastify.register(require("fastify-swagger"), {
      routePrefix: "/documentation",
      swagger: {
        info: {
          title: "Application",
          description: "Application Rest API Documentation",
          version: "0.1.0",
        },
        // host: 'localhost',
        host: `${process.env.APP_HOST}:${process.env.PORT}`,
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [],
        definitions: {
          ...fastify.getSchemas(),
        },
      },
      uiConfig: {
        docExpansion: "full",
        deepLinking: false,
      },
      exposeRoute: true,
    });
  },
  {
    fastify: "3.x",
    name: "swagger",
  }
);
