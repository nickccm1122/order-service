'use strict'

const Orders = require('../models/Orders')

const create = async ({ origin, destination, distance }) => {
  const created = await Orders.create({
    origin,
    destination,
    distance,
  })

  return created.toObject()
}

module.exports = {
  create,
}
