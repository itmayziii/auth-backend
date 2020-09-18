import { Context } from '../../interfaces/context'
import { ClientType, MutationResolvers } from '../../interfaces/graphql-schema'

const registerClient: MutationResolvers<Context>['registerClient'] = async function registerClient (parent, args, { db }) {
  return await db.select('*').from('client')
    .then(result => {
      return {
        client: {
          ID: 'blah',
          name: 'Tommy client',
          createdAt: new Date(),
          updatedAt: new Date(),
          type: ClientType.Public,
          redirectURIs: ['hello'],
          loginCount: 3
        }
      }
    })
}

export const clientResolvers: { Mutation: Pick<MutationResolvers, 'registerClient'> } = {
  Mutation: {
    registerClient
  }
}
