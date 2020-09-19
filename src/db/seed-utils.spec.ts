import { describe, it, expect } from '@jest/globals'
import { APIFactory, tenantFactory } from './seed-utils'

describe('tenantFactory', () => {
  it('should return a fake tenant', async () => {
    expect.assertions(1)
    return await tenantFactory(1)
      .then(actual => {
        expect(actual[0]).toStrictEqual(expect.objectContaining({
          id: expect.any(String),
          created_at: expect.any(Date),
          updated_at: expect.any(Date),
          name: expect.any(String)
        }))
      })
  })

  it('should return a new fake tenant on every call', async () => {
    expect.assertions(1)
    return await Promise.all([tenantFactory(), tenantFactory()])
      .then(([tenant1, tenant2]) => {
        expect(tenant1[0].name === tenant2[0].name).toBe(false)
      })
  })
})

describe('fn - APIFactory', () => {
  it('should return a fake API', async () => {
    expect.assertions(1)
    return await APIFactory()
      .then(actual => {
        expect(actual[0]).toStrictEqual(expect.objectContaining({
          id: expect.any(String),
          created_at: expect.any(Date),
          updated_at: expect.any(Date),
          name: expect.any(String)
        }))
      })
  })

  it('should return a new fake tenant on every call', async () => {
    expect.assertions(1)
    return await Promise.all([APIFactory(), APIFactory()])
      .then(([api1, api2]) => {
        expect(api1[0].name === api2[0].name).toBe(false)
      })
  })
})
