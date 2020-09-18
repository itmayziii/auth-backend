import express from 'express'
import knex from 'knex'
import { startServer } from './server'
import { typeDefs } from './graphql/type-defs'
import { resolvers } from './graphql/resolvers'
import { context } from './graphql/context'
import { ApolloServer } from 'apollo-server-express'
import { AppLocals } from './interfaces/express-locals'
import { getDBConnection } from './db/connection'
import { getDBConfig } from './config'

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
  return await getDBConfig()
    .then(dbConfig => getDBConnection(dbConfig, knex))
    .then(db => ({
      db
    }))
}
