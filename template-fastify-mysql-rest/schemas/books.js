"use strict";

const bodyJsonSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    title: { type: "string" },
    author: { type: "string" },
    topics: {
      type: "string",
      enum: ["Fantasy", "Horror", "Thriller", "Sci-Fi"],
    },
  },
  required: [],
};

const getAllResponseJsonSchema = {
  200: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...bodyJsonSchema.properties,
          },
        },
      },
      page: { type: "number" },
      limit: { type: "number" },
      count: { type: "number" },
    },
  },
};

const getSingleResponseJsonSchema = {
  200: {
    type: "object",
    properties: {
      ...bodyJsonSchema.properties,
    },
  },
};

module.exports = {
  bodyJsonSchema,
  getAllResponseJsonSchema,
  getSingleResponseJsonSchema,
};
