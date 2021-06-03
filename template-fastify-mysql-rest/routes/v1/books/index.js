"use strict";

const {
  bodyJsonSchema,
  getAllResponseJsonSchema,
  getSingleResponseJsonSchema,
} = require("../../../schemas/books");
const {
  paramsJsonSchema,
  queryStringJsonSchema,
} = require("../../../schemas/utils");

module.exports = async function (fastify, opts) {
  const table = "books";

  fastify.get(
    "",
    {
      schema: {
        tags: ["Books"],
        description: "Get All Books",
        querystring: queryStringJsonSchema,
        response: {
          ...getAllResponseJsonSchema,
        },
      },
    },
    async function (request, reply) {
      const query = request.query;
      const results = await fastify.knex(table);
      const count = await fastify.knex(table).count();
      reply.send({
        data: results,
        page: 0,
        limit: 0,
        count: count[0]["count(*)"],
      });
    }
  );

  fastify.get(
    "/:id",
    {
      schema: {
        tags: ["Books"],
        description: "Get A Book By Id",
        params: paramsJsonSchema,
        response: {
          ...getSingleResponseJsonSchema,
        },
      },
    },
    async function (request, reply) {
      const id = request.params.id;
      const result = await fastify.knex(table).where({ id }).first();
      if (result) {
        reply.send(result);
      } else {
        reply.notFound();
      }
    }
  );

  fastify.post(
    "",
    {
      schema: {
        tags: ["Books"],
        description: "Create A Book",
        body: bodyJsonSchema,
      },
    },
    async function (request, reply) {
      const values = { ...request.body };
      try {
        const id = await fastify.knex(table).insert({ ...values });
        const recordInserted = await fastify
          .knex(table)
          .where({ id: id[0] })
          .first();
        reply.send(recordInserted);
      } catch (e) {
        reply.badRequest(e.message);
      }
    }
  );

  fastify.put(
    "/:id",
    {
      schema: {
        tags: ["Books"],
        description: "Update A Book By Id",
        body: bodyJsonSchema,
        params: paramsJsonSchema,
      },
    },
    async function (request, reply) {
      const id = request.params.id;
      const values = { ...request.body };
      try {
        const updated = await fastify
          .knex(table)
          .where({ id })
          .update({ ...values });
        const record = await fastify.knex(table).where({ id }).first();
        reply.send({ id, ...record });
      } catch (e) {
        fastify.httpErrors.internalServerError(e.message);
      }
    }
  );

  fastify.delete(
    "/:id",
    {
      schema: {
        tags: ["Books"],
        description: "Delete A Team By Id",
        params: paramsJsonSchema,
      },
    },
    async function (request, reply) {
      const id = request.params.id;
      const result = await fastify.knex(table).where({ id }).delete();
      if (result) {
        reply.send({ result: "ok" });
      } else {
        reply.notFound();
      }
    }
  );
};
