'use strict'

const { createService } = require('../distanceMatrix')

describe('distanceMatrix service', () => {
  describe('createService', () => {
    let distanceMatrixService

    test('should return an object with apis', () => {
      distanceMatrixService = createService({
        apiKey: 'dummy-api-key',
      })

      expect(distanceMatrixService).toEqual(
        expect.objectContaining({
          getDistanceInMeters: expect.any(Function),
        })
      )
    })

    describe('getDistanceInMeters', () => {
      test.todo('should return a number if called successfully')

      test.todo('should return null if googleMapSdk call failed')
    })
  })
})
