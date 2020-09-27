import * as Knex from 'knex'
import { APIFactory } from '../seed-utils'

export async function seed (knex: Knex): Promise<Knex.QueryBuilder> {
  return await APIFactory(5)
    .then(async (fakeAPIs) => {
      return await knex.table('api').insert(fakeAPIs)
    })
}
