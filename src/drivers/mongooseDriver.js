'use strict'

const mongoose = require('mongoose')

module.exports = {
  getClient: () => mongoose,
  connect: async ({ debug, uri, name }) => {
    mongoose.set('debug', debug)
    return mongoose.connect(uri, {
      keepAlive: true,
      dbName: name,
    })
  },
  disconnect: () => mongoose.disconnect(),
}
