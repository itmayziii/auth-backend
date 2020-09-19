import { PoolConfig, PgConnectionConfig } from 'knex'

export async function getDBConfig (): Promise<{ client: string, connection: PgConnectionConfig, pool: PoolConfig }> {
  return {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
