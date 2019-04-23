'use strict'

const mongooseDriver = require('../../drivers/mongooseDriver.js')

describe('orderRepository', () => {
  let orderRepository
  let Orders

  beforeEach(async () => {
    await mongooseDriver.connect(global.mongodb)
    orderRepository = require('../orderRepository')
    Orders = require('../../models/Orders')
  })

  afterEach(async () => {
    await global.resetMongoAsync()
    await mongooseDriver.disconnect()
  })

  describe('create()', () => {
    describe('give minimal required fields', () => {
      const payload = {
        origin: ['1.1', '1.2'],
        destination: ['1.2', '1.3'],
        distance: 10,
      }

      test('should create an order', async () => {
        const created = await orderRepository.create(payload)

        expect(created).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            status: Orders.STATUS.UNASSIGNED,
            origin: payload.origin,
            destination: payload.destination,
            distance: payload.distance,
          })
        )
      })
    })
  })
})
