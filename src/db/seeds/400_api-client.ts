import * as Knex from 'knex'
import { Client } from '../../interfaces/models/client'
import { randomItems } from '../../utils/array'
import faker from 'faker/locale/en_US'
import { ApiClient } from '../../interfaces/models/api-client'

export async function seed (knex: Knex): Promise<Knex.QueryBuilder> {
  return await Promise.all([
    knex.select().from<Client>('client'),
    knex.select().from<Client>('api')
  ])
    .then(([clients, apis]) => {
      return clients.reduce<Array<Omit<ApiClient, 'id'>>>((accumulator, client) => {
        const randomAPIs = randomItems(apis, 4, (existingItem, newItem) => existingItem.id === newItem.id)
        return [...accumulator, ...randomAPIs.map(randomAPI => ({
          created_at: faker.date.recent(5),
          updated_at: faker.date.future(),
          api_id: randomAPI.id,
          client_id: client.id
        }))]
      }, [])
    })
    .then(apiClients => knex.table('api_client').insert(apiClients))
}
