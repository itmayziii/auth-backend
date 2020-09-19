import * as Knex from 'knex'
import { clientFactory } from '../seed-utils'
import { Tenant } from '../../interfaces/models/tenant'

export async function seed (knex: Knex): Promise<Knex.QueryBuilder> {
  return await knex.select().from<Tenant>('tenant')
    .then(async (tenants) => {
      return await Promise.all(
        tenants.map(async (tenant) => await clientFactory(knex, tenant.id, Math.floor(Math.random() * 3) + 1))
      )
    })
    .then(clients => {
      return knex.table('client').insert(clients.reduce((c, accumulator) => {
        return [...accumulator, ...c]
      }, []))
    })
}
