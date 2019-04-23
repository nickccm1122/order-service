'use strict'

const Orders = require('../models/Orders')
const { transformOrder } = require('./transformers')

/**
 * @async
 * @param {Object} order
 * @param {string[]} order.origin - tuple, e.g. [ 'latitude', 'longitude']
 * @param {string[]} order.destination - tuple, e.g. [ 'latitude', 'longitude' ]
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

/**
 * @async
 * @param {string} orderId
 *
 * @returns {Object} - { ok }
 */
const takeOrder = async orderId => {
  const result = await Orders.updateOne(
    {
      _id: orderId,
      status: Orders.STATUS.UNASSIGNED,
    },
    { status: Orders.STATUS.TAKEN }
  )

  return {
    ok: result.nModified >= 1,
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
const getOrders = async ({ page, limit }) => {
  const orders = await Orders.aggregate([
    {
      $skip: page * limit,
    },
    {
      $limit: limit,
    },
  ]).exec()

  return orders.map(order => transformOrder(order))
}

module.exports = {
  create,
  takeOrder,
  getOrders,
}
