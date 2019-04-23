'use strict'

const assert = require('assert')

const postOrderSchema = require('./postOrder.schema')
const patchOrderSchema = require('./patchOrder.schema')

const orderRoutes = async (fastify, opts) => {
  const { orderService } = fastify
  assert(orderService, 'orderService is not registered')

  fastify.post('/orders', postOrderSchema, async (request, reply) => {
    const { origin, destination } = request.body

    const newOrder = await orderService.createOrder({ origin, destination })

    return newOrder
  })

  fastify.patch('/orders/:orderId', patchOrderSchema, async (request, reply) => {
    const { orderId } = request.params

    const { ok } = await orderService.takeOrder(orderId)

    if (!ok) {
      // TODO: use custom error class provide more context
      const error = new Error('order may has been taken')
      error.statusCode = 400
      return error
    }

    return {
      status: 'SUCCESS',
    }
  })
}

module.exports = orderRoutes
