import { Context } from '../../interfaces/context'
import { ClientType, MutationResolvers } from '../../interfaces/graphql-schema'

const registerClient: MutationResolvers<Context>['registerClient'] = async function registerClient (parent, args, { db }) {
  return await db.select('*').from('client')
    .then(result => {
      return {
        client: {
          name: 'Tommy client',
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
