import * as Knex from 'knex'

export function getDBConnection (config: Knex.Config, knex: typeof Knex.default): Knex {
  const db = knex(config)
  db.on('query', ({ sql, bindings }) => {
    console.log('sql', sql)
    console.log('bindings', bindings)
  })
  return db
}
