'use strict'

const Fastify = require('fastify')

const buildFastify = () => {
  const fastify = Fastify({ logger: true })

  fastify.get('/healthz', async (request, reply) => {
    return 'ok'
  })

  return fastify
}

exports.buildFastify = buildFastify
