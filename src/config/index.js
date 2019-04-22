'use strict'

const convict = require('convict')
const toml = require('toml')
const path = require('path')

convict.addParser({ extension: 'toml', parse: toml.parse })

const config = convict(path.join(__dirname, 'configSchema.toml'))

config.loadFile([path.join(__dirname, 'config.toml')])
config.validate({ allowed: 'warn' })

module.exports = config
