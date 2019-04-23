'use strict'

const assert = require('assert')

const createService = ({ orderRepository, distanceMatrixService }) => {
  assert(orderRepository, 'missing orderRepository dependency')
  assert(distanceMatrixService, 'missing distanceMatrixService dependency')

  /**
   * @async
   * @param {Object} order
   * @param {String[]} order.origin - tuple, e.g. [ 'latitude', 'longitude']
   * @param {String[]} order.destination - tuple, e.g. [ 'latitude', 'longitude' ]
   *
   * @returns {Object}
   */
  const createOrder = async ({ origin, destination }) => {
    const distance = await distanceMatrixService.getDistanceInMeters({
      origin,
      destination,
    })

    if (distance === null) {
      // TODO: use custom error class provide more context
      throw new Error('failed to estimate distance')
    }

    const newOrder = await orderRepository.create({
      origin,
      destination,
      distance,
    })

    return newOrder
  }

  /**
   * @async
   * @param {string} orderId
   *
   * @returns {number} lockId
   */
  const takeOrder = async orderId => {
    const { ok } = await orderRepository.takeOrder(orderId)

    return {
      ok,
    }
  }

  /**
   * @async
   * @param {Object} option
   * @param {number} option.page
   * @param {number} option.limit
   *
   * @return {Object[]}
   */
  const getOrders = async ({ page = 0, limit = 50 }) => {
    const orders = await orderRepository.getOrders({
      page,
      limit,
    })

    return orders
  }

  return { createOrder, takeOrder, getOrders }
}

module.exports = {
  createService,
}
