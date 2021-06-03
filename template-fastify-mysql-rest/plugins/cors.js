'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-cors'), {
    origin: '*',
    methods: ['HEAD', 'OPTIONS', 'POST', 'GET', 'PUT', 'DELETE']
  })
}, {
  fastify: '3.x',
  name: 'cors'
})
