'use strict'

const fp = require('fastify-plugin')
const mongooseDriver = require('../drivers/mongooseDriver')

const dbPlugin = async (fastify, pluginOptions) => {
  const { dbName, uri } = pluginOptions
  const connection = await mongooseDriver.connect({
    uri,
    name: dbName,
  })

  fastify.addHook('onClose', (fastify, done) => {
    connection.close(true, done)
  })
}

module.exports = fp(dbPlugin)
