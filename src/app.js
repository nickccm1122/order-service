'use strict'

const Fastify = require('fastify')
const fastifySwagger = require('fastify-swagger')

const packageInfo = require('../package')
const mongoosePlugin = require('./plugins/mongoosePlugin')
const orderRoutes = require('./routes/order')
const config = require('./config')
const orderRepository = require('./repositories/orderRepository')
const {
  createService: createDistanceMatrix,
} = require('./services/distanceMatrix')
const { createService: createOrderService } = require('./services/order')

const buildFastify = () => {
  const fastify = Fastify()

  const distanceMatrixService = createDistanceMatrix({
    apiKey: config.get('googleMap.apiKey'),
  })

  const orderService = createOrderService({
    orderRepository,
    distanceMatrixService,
  })

  fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: packageInfo.name,
        description: packageInfo.description,
        version: `${packageInfo.version}(${config.get('env')})`,
      },
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  })

  fastify.register(mongoosePlugin, {
    uri: config.get('mongo.uri'),
    dbName: 'order-service',
  })

  // TODO: consider using registrar for dependency injection
  fastify.decorate('orderRepository', orderRepository)
  fastify.decorate('orderService', orderService)

  fastify.get('/healthz', async (request, reply) => {
    return 'ok'
  })

  fastify.register(orderRoutes)

  return fastify
}

exports.buildFastify = buildFastify
