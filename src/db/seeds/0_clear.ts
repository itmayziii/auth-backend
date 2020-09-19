import * as Knex from 'knex'

export async function seed (knex: Knex): Promise<Knex.QueryBuilder> {
  const deleteAPIClient = knex.table('api_client').del()
  const deleteClient = knex.table('client').del()
  const deleteAPI = knex.table('api').del()
  const deleteTenant = knex.table('tenant').del()

  return await deleteAPIClient
    .then(() => deleteClient)
    .then(() => deleteAPI)
    .then(() => deleteTenant)
}
