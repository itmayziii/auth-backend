import { describe, it, expect } from '@jest/globals'
import * as Knex from 'knex'
import { getDBConnection } from './connection'

interface FakeObjects {
  fakeDB: Knex
  fakeKnex: typeof Knex['default']
  fakeDBConfig: Knex.Config
}

function fakeObjects (): FakeObjects {
  const fakeDB: Knex = {
    on: () => {}
  } as unknown as Knex
  jest.spyOn(fakeDB, 'on')

  const fakeKnex = jest.fn().mockReturnValue(fakeDB) as unknown as typeof Knex['default']
  const fakeDBConfig: Knex.Config = {}
  return {
    fakeDB,
    fakeKnex,
    fakeDBConfig
  }
}

describe('getDBConnection', () => {
  it('returns a database connection', () => {
    expect.assertions(1)
    const { fakeDB, fakeKnex, fakeDBConfig } = fakeObjects()
    const actual = getDBConnection(fakeDBConfig, fakeKnex)
    expect(actual).toStrictEqual(fakeDB)
  })

  it('listens to queries for logging', () => {
    expect.assertions(1)
    const { fakeDB, fakeKnex, fakeDBConfig } = fakeObjects()
    getDBConnection(fakeDBConfig, fakeKnex)
    expect(fakeDB.on).toHaveBeenCalledWith('query', expect.any(Function))
  })
})
