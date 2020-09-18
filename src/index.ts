import express from 'express'
import { startServer } from './server'
import { typeDefs } from './graphql/type-defs'
import { resolvers } from './graphql/resolvers'
import { context } from './graphql/context'
import { ApolloServer } from 'apollo-server-express'
import { AppLocals } from './interfaces/express-locals'
import { getDBConnection } from './db/connection'

Promise.all([typeDefs(), resolvers(), getAppLocals()])
  .then(([typeDefs, resolvers, appLocals]) => {
    const app = express()
    const graphQLServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ res: response }) => context(appLocals, response.locals),
      introspection: true,
      playground: true
    })

    startServer(graphQLServer, app, appLocals)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

async function getAppLocals (): Promise<AppLocals> {
  return await getDBConnection()
    .then(db => ({
      db
    }))
}
