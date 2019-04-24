'use strict'

const { buildFastify } = require('../app')
const { createService } = require('../services/distanceMatrix')
const Orders = require('../models/Orders')

const supertest = require('supertest')

jest.mock('../plugins/mongoosePlugin')
jest.mock('../services/distanceMatrix')

describe('Order API', () => {
  const mockedDistanceMatrixService = {
    getDistanceInMeters: jest.fn(),
  }
  createService.mockImplementation(() => {
    return mockedDistanceMatrixService
  })

  const fastify = buildFastify()

  beforeAll(() => {
    return fastify.ready()
  })

  afterEach(async () => {
    await global.resetMongoAsync()
  })

  afterAll(() => {
    fastify.close()
  })

  describe('POST /orders', () => {
    test('200', async () => {
      const mockedRetrievedDistance = 3000
      mockedDistanceMatrixService.getDistanceInMeters.mockResolvedValueOnce(
        mockedRetrievedDistance
      )

      const response = await supertest(fastify.server)
        .post('/orders')
        .send({
          origin: [22.3331922, 114],
          destination: [22.3392422, 114.1958032],
        })
        .expect(200)

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          distance: mockedRetrievedDistance,
          status: Orders.STATUS.UNASSIGNED,
        })
      )
    })

    test('payload missing required fields', async () => {
      await supertest(fastify.server)
        .post('/orders')
        .send({
          origin: [22.3331922, 114],
        })
        .expect(400)

      await supertest(fastify.server)
        .post('/orders')
        .send({
          destination: [22.3392422, 114.1958032],
        })
        .expect(400)
    })
  })

  describe('PATCH /orders/:orderId', () => {
    let createOrderResponse

    beforeEach(async () => {
      const mockedRetrievedDistance = 3000
      mockedDistanceMatrixService.getDistanceInMeters.mockResolvedValueOnce(
        mockedRetrievedDistance
      )

      createOrderResponse = await supertest(fastify.server)
        .post('/orders')
        .send({
          origin: [22.3331922, 114],
          destination: [22.3392422, 114.1958032],
        })
    })

    test('200', async () => {
      const orderId = createOrderResponse.body.id

      const response = await supertest(fastify.server)
        .patch(`/orders/${orderId}`)
        .send({
          status: 'TAKEN',
        })
        .expect(200)

      expect(response.body).toEqual({
        status: 'SUCCESS',
      })
    })

    test('should return 400 when try to take a "TAKEN" order', async () => {
      const orderId = createOrderResponse.body.id

      // taken once
      await supertest(fastify.server)
        .patch(`/orders/${orderId}`)
        .send({
          status: 'TAKEN',
        })
        .expect(200)

      // take the same order again
      await supertest(fastify.server)
        .patch(`/orders/${orderId}`)
        .send({
          status: 'TAKEN',
        })
        .expect(400)
    })
  })

  describe('GET /orders', () => {
    describe('when there is empty records in db', () => {
      test('200 should return empty array', async () => {
        const response = await supertest(fastify.server)
          .get(`/orders`)
          .query({ page: 0, limit: 10 })
          .expect(200)

        expect(response.body).toEqual([])
      })
    })

    describe('when there are records in db', () => {
      let createOrderResponse
      const mockedRetrievedDistance = 3000

      beforeEach(async () => {
        mockedDistanceMatrixService.getDistanceInMeters.mockResolvedValueOnce(
          mockedRetrievedDistance
        )

        createOrderResponse = await supertest(fastify.server)
          .post('/orders')
          .send({
            origin: [22.3331922, 114],
            destination: [22.3392422, 114.1958032],
          })
      })

      test('200', async () => {
        const response = await supertest(fastify.server)
          .get(`/orders`)
          .query({ page: 0, limit: 10 })
          .expect(200)

        expect(response.body).toEqual(
          expect.arrayContaining([
            {
              id: createOrderResponse.body.id,
              distance: mockedRetrievedDistance,
              status: Orders.STATUS.UNASSIGNED,
            },
          ])
        )
      })
    })
  })
})
