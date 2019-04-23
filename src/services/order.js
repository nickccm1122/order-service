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

    return {
      id: newOrder._id,
      distance: newOrder.distance,
      status: newOrder.status,
    }
  }

  return { createOrder }
}

module.exports = {
  createService,
}
