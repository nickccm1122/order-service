'use strict'

const fp = require('fastify-plugin')
const mongooseDriver = require('../../drivers/mongooseDriver')

const dbPlugin = async (fastify, pluginOptions) => {
  const connection = await mongooseDriver.connect(global.mongodb)

  fastify.addHook('onClose', (fastify, done) => {
    connection.disconnect(true, done)
  })
}

module.exports = fp(dbPlugin)
