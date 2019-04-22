'use strict'

const { buildFastify } = require('./app')

const start = async () => {
  let fastify
  try {
    const fastify = buildFastify()

    // NOTE: To listen on all available IPv4 interfaces, we need to pass '0.0.0.0' to indicate. See https://www.fastify.io/docs/latest/Getting-Started/#your-first-server
    await fastify.listen(8080, '0.0.0.0')

    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
