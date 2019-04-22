'use strict'

const { buildFastify } = require('./app')

const start = async () => {
  let fastify
  try {
    const fastify = buildFastify()

    await fastify.listen(8080)

    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
