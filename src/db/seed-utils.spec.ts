import { describe, it, expect } from '@jest/globals'
import { APIFactory, tenantFactory } from './seed-utils'

describe('tenantFactory', () => {
  it('should return a fake tenant', () => {
    expect.assertions(1)
    const actual = tenantFactory()
    expect(actual).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      name: expect.any(String)
    }))
  })

  it('should return a new fake tenant on every call', () => {
    expect.assertions(1)
    const tenant1 = tenantFactory()
    const tenant2 = tenantFactory()
    expect(tenant1.name === tenant2.name).toBe(false)
  })
})

describe('fn - APIFactory', () => {
  it('should return a fake API', () => {
    expect.assertions(1)
    const actual = APIFactory()
    expect(actual).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      name: expect.any(String)
    }))
  })

  it('should return a new fake tenant on every call', () => {
    expect.assertions(1)
    const api1 = APIFactory()
    const api2 = APIFactory()
    expect(api1.name === api2.name).toBe(false)
  })
})
