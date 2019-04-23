'use strict'

const Orders = require('../../models/Orders')

// TODO: consider make global shared schema
const mongoObjectIdSchema = {
  type: 'string',
  additionalProperties: false,
  pattern: '^[0-9a-fA-f]{24}$',
  errors: 'Invalid ID',
}

module.exports = {
  schema: {
    params: {
      orderId: mongoObjectIdSchema,
    },
    body: {
      type: 'object',
      required: ['status'],
      properties: {
        status: {
          type: 'string',
          enum: [Orders.STATUS.TAKEN],
        },
      },
    },
  },
}
