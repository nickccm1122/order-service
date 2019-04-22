'use strict'

const Orders = require('../models/Orders')
const { transformOrder } = require('./transformers')

/**
 * @async
 * @param {Object} order
 * @param {String[]} order.origin - tuple, e.g. [ 'longitude', 'latitude']
 * @param {String[]} order.destination - tuple, e.g. [ 'longitude', 'latitude']
 * @param {Number} order.distance
 * @returns {Object}
 */
const create = async ({ origin, destination, distance }) => {
  const created = await Orders.create({
    origin: {
      type: 'Point',
      coordinates: origin.map(Number),
    },
    destination: {
      type: 'Point',
      coordinates: destination.map(Number),
    },
    distance,
  })

  return transformOrder(created.toObject())
}

module.exports = {
  create,
}
