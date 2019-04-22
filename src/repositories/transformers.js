'use strict'

const R = require('ramda')

const mongoose = require('mongoose')

const toStringIfObjectId = value => {
  if (value instanceof mongoose.Types.ObjectId) {
    return value.toString()
  }
  return value
}

const toLongitudeLatitude = value => {
  if (
    R.is(Object, value) &&
    value.type === 'Point' &&
    R.is(Array, value.coordinates)
  ) {
    return value.coordinates.map(String)
  } else {
    return []
  }
}

const transformOrder = R.when(
  R.is(Object),
  R.pipe(
    R.omit(['__v', 'updatedAt', 'createdAt']),
    R.evolve({
      _id: toStringIfObjectId,
      origin: toLongitudeLatitude,
      destination: toLongitudeLatitude,
    })
  )
)

module.exports = {
  transformOrder,
}
