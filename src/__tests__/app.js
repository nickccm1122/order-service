'use strict'

const { buildFastify } = require('../app')

jest.mock('../plugins/mongoosePlugin')

describe('app.js', () => {
  const fastify = buildFastify()

  afterAll(() => {
    fastify.close()
  })

  it('should be able to start a server', async () => {
    expect.assertions(1)

    const response = await fastify.inject({
      method: 'GET',
      url: '/healthz',
    })

    expect(response.payload).toBe('ok')
  })
})
