import { describe, it, expect } from '@jest/globals'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { startServer } from './server'
import { AppLocals } from './interfaces/express-locals'

interface FakeData {
  fakeGraphQLServer: ApolloServer
  fakeExpressApplication: express.Application
}

function createFakeData (): FakeData {
  const fakeGraphQLServer: ApolloServer = {
    applyMiddleware: () => {}
  } as any
  const fakeExpressApplication: express.Application = {
    use: () => {},
    listen: () => {}
  } as any

  jest.spyOn(fakeGraphQLServer, 'applyMiddleware')
  jest.spyOn(fakeExpressApplication, 'use')
  jest.spyOn(fakeExpressApplication, 'listen')
  return {
    fakeGraphQLServer,
    fakeExpressApplication
  }
}

describe('startServer', () => {
  it('should set express app locals', () => {
    expect.assertions(1)

    const { fakeGraphQLServer, fakeExpressApplication } = createFakeData()
    const fakeAppLocals: AppLocals = { testing: 'auth testing' } as any
    startServer(fakeGraphQLServer, fakeExpressApplication, fakeAppLocals)
    expect(fakeExpressApplication.locals).toStrictEqual({ testing: 'auth testing' })
  })

  it('should apply middleware to the server', () => {
    expect.assertions(2)

    const { fakeGraphQLServer, fakeExpressApplication } = createFakeData()
    const fakeAppLocals: AppLocals = { testing: 'auth testing' } as any
    startServer(fakeGraphQLServer, fakeExpressApplication, fakeAppLocals)
    expect(fakeGraphQLServer.applyMiddleware).toHaveBeenCalledWith({ app: fakeExpressApplication })
    expect(fakeExpressApplication.use).toHaveBeenCalledTimes(3)
  })

  it('should listen for HTTP requests', () => {
    expect.assertions(1)

    const { fakeGraphQLServer, fakeExpressApplication } = createFakeData()
    const fakeAppLocals: AppLocals = { testing: 'auth testing' } as any
    startServer(fakeGraphQLServer, fakeExpressApplication, fakeAppLocals)
    expect(fakeExpressApplication.listen).toHaveBeenCalledWith(3000, expect.any(Function))
  })
})
