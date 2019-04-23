'use strict'

const Fastify = require('fastify')
const mongoosePlugin = require('./plugins/mongoosePlugin')
const config = require('./config')

const buildFastify = () => {
  const fastify = Fastify({ logger: true })

  fastify.register(mongoosePlugin, {
    uri: config.get('mongo.uri'),
    dbName: 'order-service'
  })

  fastify.get('/healthz', async (request, reply) => {
    return 'ok'
  })

  return fastify
}

exports.buildFastify = buildFastify
