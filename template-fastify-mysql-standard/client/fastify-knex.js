const fp = require("fastify-plugin");
const {
  MYSQL_CLIENT,
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

const clientKnex = require("knex")({
  client: MYSQL_CLIENT,
  connection: {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  },
});

async function fastifyKnexClient(fastify, options, done) {
  if (!clientKnex) {
    console.log("Si è verificato un errore creazione client DB!");
  } else {
    fastify.decorate("knex", clientKnex);
    fastify.addHook("onClose", () => clientKnex.destroy());
  }
  done();
}

module.exports = fp(fastifyKnexClient, {
  fastify: ">=1.0.0",
  dependencies: ["cors"],
});
