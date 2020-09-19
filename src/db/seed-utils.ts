import faker from 'faker/locale/en_US'
import { Tenant } from '../interfaces/models/tenant'
import { API } from '../interfaces/models/api'
import { Client } from '../interfaces/models/client'
import * as Knex from 'knex'
import { callTimes } from '../utils/function'

export async function tenantFactory (howMany: number = 1): Promise<Tenant[]> {
  return await callTimes(() => ({
    id: faker.random.uuid(),
    created_at: faker.date.recent(5),
    updated_at: faker.date.future(),
    // Random number because company name is not unique enough for the column constraints.
    name: `${faker.company.companyName()} - ${faker.random.number()}`
  }), howMany)
}

export async function APIFactory (howMany: number = 1): Promise<API[]> {
  return await callTimes(() => ({
    id: faker.random.uuid(),
    created_at: faker.date.recent(5),
    updated_at: faker.date.future(),
    // Random number because hacker noun is not unique enough for the column constraints.
    name: `${faker.hacker.noun()} - ${faker.random.number()}`
  }), howMany)
}

export async function clientFactory (knex: Knex, tenantID: string, howMany: number = 1): Promise<Client[]> {
  return await callTimes(() => {
    return {
      id: faker.random.uuid(),
      created_at: faker.date.recent(5),
      updated_at: faker.date.future(),
      name: `${faker.hacker.noun()} - ${faker.random.number()}`,
      tenant_id: tenantID
    }
  }, howMany)
}
