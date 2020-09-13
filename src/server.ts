import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { IResolvers } from 'graphql-tools'
import { router } from './router'
import { typeDefs } from './graphql/type-defs'
import { resolvers } from './graphql/resolvers'
import { authenticateMiddleware } from './middleware/authenticate'
import { AppLocals } from './interfaces/express-locals'
import { context } from './graphql/context'
import { getDBConnection } from './db/connection'

Promise.all([typeDefs(), resolvers(), getAppLocals()])
  .then(([typeDefs, resolvers, appLocals]) => {
    const app = express()
    const graphQLServer = new ApolloServer({
      typeDefs,
      // Not ecstatic about having to do a type assertion here but Apollo is relying on graphql-tools 4,
      // and the version we are using to generate these resolvers is 6 so they are not compatible type definitions.
      resolvers: resolvers as IResolvers,
      context: ({ res: response }) => context(appLocals, response.locals),
      introspection: true,
      playground: true
    })

    app.locals = appLocals
    applyGlobalMiddleware(app, graphQLServer)

    const port = 3000
    app.listen(port, () => {
      console.log(`Authorization server running at http://localhost:${port}`)
    })
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

function applyGlobalMiddleware (app: express.Application, graphQLServer: ApolloServer): void {
  app.use(express.json())
  app.use(authenticateMiddleware)
  app.use(router)

  graphQLServer.applyMiddleware({ app })
}

async function getAppLocals (): Promise<AppLocals> {
  return await getDBConnection()
    .then(db => ({
      db
    }))
}
