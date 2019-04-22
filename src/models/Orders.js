'use strict'

const mongoose = require('mongoose')

const { Schema } = mongoose

const STATUS = Object.freeze({
  UNASSIGNED: 'UNASSIGNED',
  TAKEN: 'TAKEN',
})

const pointSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  { _id: false }
)

const orderSchema = new Schema(
  {
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.UNASSIGNED,
      required: true,
    },
    origin: {
      type: pointSchema,
      required: true,
    },
    destination: {
      type: pointSchema,
      required: true,
    },
    distance: {
      type: Number, // in meters
      required: true,
    },
    lockId: String,
    lockedAt: Date,
  },
  { useNestedStrict: true, timestamps: true }
)

orderSchema.statics = {
  STATUS,
}

module.exports = mongoose.model('Orders', orderSchema, 'orders')
