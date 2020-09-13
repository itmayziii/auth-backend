import * as Knex from 'knex'
import { tenantFactory } from '../seed-utils'
import { Tenant } from '../../interfaces/models/tenant'
import { callTimes } from '../../utils/function'

export async function seed (knex: Knex): Promise<Tenant[]> {
  return await knex.table('tenant').del()
    .then(() => {
      return knex.table('tenant').insert(callTimes(tenantFactory, 50))
    })
}
