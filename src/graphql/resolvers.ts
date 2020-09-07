import { Resolvers } from '../interfaces/graphql-schema'
import { Context } from '../interfaces/context'
import { clientResolvers } from './resolvers/clients'

export function resolvers (): Resolvers<Context> {
  return {
    Mutation: {
      ...clientResolvers.Mutation
    }
  }
}
