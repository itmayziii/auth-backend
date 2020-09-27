import * as http from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { router } from './router'
import { authenticateMiddleware } from './middleware/authenticate'
import { AppLocals } from './interfaces/express-locals'

export function startServer (graphQLServer: ApolloServer, app: express.Application, appLocals: AppLocals): http.Server {
  app.locals = appLocals
  applyGlobalMiddleware(app, graphQLServer)

  const port = Number(process.env.SERVER_PORT)
  return app.listen(port, () => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(`Authorization server running at http://localhost:${port}`)
    }
  })
}

function applyGlobalMiddleware (app: express.Application, graphQLServer: ApolloServer): void {
  app.use(express.json())
  app.use(authenticateMiddleware)
  app.use(router)

  graphQLServer.applyMiddleware({ app })
}
