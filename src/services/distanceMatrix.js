'use strict'

const R = require('ramda')
const googleMapSdk = require('@google/maps')

/**
 * create distance matrix service
 *
 * @param {Object} option
 * @param {string} option.apiKey
 */
const createService = ({ apiKey }) => {
  const googleMapsClient = googleMapSdk.createClient({
    key: apiKey,
    Promise: Promise,
  })

  /**
   * @param {Object} option
   * @param {string[]} option.origin
   * @param {string[]} option.destination
   *
   * @returns {number|null}
   */
  const getDistanceInMeters = async ({ origin, destination }) => {
    try {
      // see https://developers.google.com/maps/documentation/distance-matrix/intro#StatusCodes for status codes
      const { json } = await googleMapsClient
        .distanceMatrix({
          origins: [origin],
          destinations: [destination],
          units: 'metric',
        })
        .asPromise()

      const distanceInMeters = R.pathOr(
        null,
        ['rows', 0, 'elements', 0, 'distance', 'value'],
        json
      )

      return distanceInMeters
    } catch (err) {
      console.error('failed to get distance', err)
      return null
    }
  }

  return {
    getDistanceInMeters,
  }
}

module.exports = {
  createService,
}
