// http://knexjs.org/#knexfile

import dotenv from 'dotenv'
import path from 'path'
import { getDBConfig } from '../config'
import { Config } from 'knex'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export default async function fetchConfiguration (): Promise<{ default: Config }> {
  return await getDBConfig()
    .then(({ connection, pool }) => {
      return {
        default: {
          client: 'postgresql',
          connection,
          pool,
          migrations: {
            directory: path.resolve(__dirname, 'migrations'),
            tableName: 'migrations',
            extension: 'ts'
          },
          seeds: {
            directory: path.resolve(__dirname, 'seeds'),
            extension: 'ts'
          }
        }
      }
    })
}
