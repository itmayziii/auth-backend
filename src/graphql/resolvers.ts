import { Resolvers } from '../interfaces/graphql-schema'
import { Context } from '../interfaces/context'
import { clientResolvers } from './resolvers/clients'
import { DateTimeResolver, DateResolver, TimeResolver } from 'graphql-scalars'

export function resolvers (): Resolvers<Context> {
  return {
    Mutation: {
      ...clientResolvers.Mutation
    },
    // Custom scalars
    DateTime: DateTimeResolver,
    Date: DateResolver,
    Time: TimeResolver
  }
}
