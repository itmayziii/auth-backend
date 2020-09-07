import Knex, { SchemaBuilder } from 'knex'

export function up (knex: Knex): SchemaBuilder {
  return knex.schema.createTable('client', table => {
    table.string('name', 255)
  })
}

export function down (knex: Knex): SchemaBuilder {
  return knex.schema.dropTable('client')
}
