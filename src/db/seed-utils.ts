import faker from 'faker/locale/en_US'
import { Tenant } from '../interfaces/models/tenant'
import { API } from '../interfaces/models/api'

export function tenantFactory (): Tenant {
  return {
    id: faker.random.uuid(),
    created_at: faker.date.recent(5),
    updated_at: faker.date.future(),
    // Random number because company name is not unique enough for the column constraints.
    name: `${faker.company.companyName()} - ${faker.random.number()}`
  }
}

export function APIFactory (): API {
  return {
    id: faker.random.uuid(),
    created_at: faker.date.recent(5),
    updated_at: faker.date.future(),
    // Random number because hacker noun is not unique enough for the column constraints.
    name: `${faker.hacker.noun()} - ${faker.random.number()}`
  }
}
