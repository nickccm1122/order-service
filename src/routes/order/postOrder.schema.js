'use strict'

// TODO: consider make global shared schema
const coordinatesSchema = {
  type: 'array',
  minItems: 2,
  maxItems: 2,
  items: { type: 'string' }, // Note: number will be coerced to string under default ajv config, see https://www.fastify.io/docs/v2.3.x/Validation-and-Serialization/#schema-compiler
}

module.exports = {
  schema: {
    body: {
      type: 'object',
      required: ['origin', 'destination'],
      properties: {
        origin: coordinatesSchema,
        destination: coordinatesSchema,
      },
    },
  },
}
