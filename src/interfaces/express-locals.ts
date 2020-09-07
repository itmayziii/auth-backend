import Knex from 'knex'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ResponseLocals {
}

export interface AppLocals {
  db: Knex
}
