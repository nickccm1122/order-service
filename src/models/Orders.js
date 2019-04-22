'use strict'

const mongoose = require('mongoose')
const ORDER_STATUS = require('../constants/order').STATUS

const { Schema } = mongoose

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
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.UNASSIGNED,
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

module.exports = mongoose.model('Orders', orderSchema, 'orders')
