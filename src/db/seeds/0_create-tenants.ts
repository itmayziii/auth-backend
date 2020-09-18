import * as Knex from 'knex'
import { tenantFactory } from '../seed-utils'
import { callTimes } from '../../utils/function'

export async function seed (knex: Knex): Promise<Knex.QueryBuilder> {
  return await callTimes(tenantFactory, 50)
    .then(async (fakeTenants) => {
      return await knex.table('tenant').del()
        .then(() => knex.table('tenant').insert(fakeTenants))
    })
}
