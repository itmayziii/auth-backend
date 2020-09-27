import { Context } from '../../interfaces/context'
import { MutationResolvers } from '../../interfaces/graphql-schema'

const registerClient: MutationResolvers<Context>['registerClient'] = async function registerClient (parent, args, { db }) {
  const { input: { name, description, type } } = args
  return await db.table('client').insert({
    id: db.raw('UUID_GENERATE_V4()'),
    created_at: db.raw('NOW()'),
    updated_at: db.raw('NOW()'),
    tenant_id: '2c27a4ef-a160-4d02-a85c-b576e2d377e2',
    name,
    type: type.toLowerCase(),
    description
  })
    .then(result => {
      return {
        client: {
          ID: 'blah',
          createdAt: new Date(),
          updatedAt: new Date(),
          name,
          type,
          description,
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
