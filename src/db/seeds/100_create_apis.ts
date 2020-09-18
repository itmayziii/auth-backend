import * as Knex from 'knex'
import { APIFactory } from '../seed-utils'
import { callTimes } from '../../utils/function'

export async function seed (knex: Knex): Promise<Knex.QueryBuilder> {
  return await callTimes(APIFactory, 5)
    .then(async (fakeAPIs) => {
      return await knex.table('api').del()
        .then(() => knex.table('api').insert(fakeAPIs))
    })
}
