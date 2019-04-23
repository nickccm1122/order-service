'use strict'

module.exports = {
  schema: {
    querystring: {
      type: 'object',
      required: ['page', 'limit'],
      properties: {
        page: {
          type: 'number',
          minimum: 0,
          maximum: Number.MAX_SAFE_INTEGER,
        },
        limit: {
          type: 'number',
          minimum: 0,
          maximum: Number.MAX_SAFE_INTEGER,
        },
      },
    },
  },
}
