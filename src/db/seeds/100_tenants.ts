import * as Knex from 'knex'
import { tenantFactory } from '../seed-utils'

export async function seed (knex: Knex): Promise<Knex.QueryBuilder> {
  return await tenantFactory(50)
    .then(async (fakeTenants) => {
      return await knex.table('tenant').insert(fakeTenants)
    })
}
