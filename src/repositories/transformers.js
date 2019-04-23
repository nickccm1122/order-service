'use strict'

const R = require('ramda')
const RA = require('ramda-adjunct');

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
    RA.renameKeys({
      _id: 'id'
    }),
    R.evolve({
      id: toStringIfObjectId,
      origin: toLongitudeLatitude,
      destination: toLongitudeLatitude,
    })
  )
)

module.exports = {
  transformOrder,
}
