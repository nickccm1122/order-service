'use strict'

const R = require('ramda')
const googleMapSdk = require('@google/maps')

/**
 * create distance matrix service
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
      const response = await googleMapsClient
        .distanceMatrix({
          origins: [origin],
          destinations: [destination],
          units: 'metric'
        })
        .asPromise()

      const distanceInMeters = R.pathOr(
        null,
        ['json', 'rows', 0, 'elements', 0, 'distance', 'value'],
        response
      )

      return distanceInMeters
    } catch (err) {
      console.error('failed to get distance', err)
      // TODO: re-throw for further handling?
    }
  }

  return {
    getDistanceInMeters,
  }
}

const client = createService({
  apiKey: 'AIzaSyAgkCNTKPsJNbUvfN5aQWjjhI41teZlxmE',
})

client
  .getDistanceInMeters({
    origin: ['22.3331922', '114'],
    destination: ['22.3392422', '114.1958032'],
  })
  .then(distance => {
    console.log(`distance: ${distance}`)
  })

module.exports = createService
