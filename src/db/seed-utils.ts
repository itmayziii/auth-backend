import faker from 'faker/locale/en_US'
import { Tenant } from '../interfaces/models/tenant'

export function tenantFactory (): Tenant {
  return {
    id: faker.random.uuid(),
    created_at: faker.date.recent(5),
    updated_at: faker.date.future(),
    name: `${faker.company.companyName()} - ${faker.random.number()}`
  }
}
