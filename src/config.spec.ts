import { describe, it, expect } from '@jest/globals'
import { getDBConfig } from './config'

describe('getDBConfig', () => {
  it('should return configuration that knex would expect', async () => {
    expect.assertions(1)

    process.env.DB_HOST = 'localhost'
    process.env.DB_DATABASE = 'testing'
    process.env.DB_USER = 'app'
    process.env.DB_PASSWORD = 'some_special_password'
    return await getDBConfig()
      .then(actual => {
        expect(actual).toStrictEqual({
          client: 'postgresql',
          connection: {
            host: 'localhost',
            database: 'testing',
            user: 'app',
            password: 'some_special_password'
          },
          pool: {
            min: 2,
            max: 10
          }
        })
      })
  })
})
