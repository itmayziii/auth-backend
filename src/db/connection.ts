import fetchConfiguration from './knexfile'
import * as Knex from 'knex'

export async function getDBConnection (): Promise<Knex> {
  return await fetchConfiguration()
    .then(dbConfig => {
      const db = Knex.default(dbConfig.default)
      db.on('query', ({ sql, bindings }) => {
        console.log('sql', sql)
        console.log('bindings', bindings)
      })
      return db
    })
}
