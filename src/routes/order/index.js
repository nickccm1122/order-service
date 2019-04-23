'use strict'

const assert = require('assert')

const createOrderSchema = require('./createOrder.schema')

const orderRoutes = async (fastify, opts) => {
  const { orderService } = fastify
  assert(orderService, 'orderService is not registered')

  fastify.post('/orders', createOrderSchema, async (request, reply) => {
    const { origin, destination } = request.body

    const newOrder = await orderService.createOrder({ origin, destination })

    return newOrder
  })
}

module.exports = orderRoutes
