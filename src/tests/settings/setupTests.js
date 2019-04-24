'use strict'

const path = require('path')

// load environment variables for tests
require('dotenv').config({
  path: path.join(__dirname, '../../../.env.test'),
})
