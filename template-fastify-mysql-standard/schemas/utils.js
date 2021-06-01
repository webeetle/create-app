"use strict";

const paramsJsonSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
};

const queryStringJsonSchema = {
  filters: { type: "string" },
  page: { type: "integer" },
  limit: { type: "integer" },
  order: { type: "string" },
};

module.exports = { paramsJsonSchema, queryStringJsonSchema };
