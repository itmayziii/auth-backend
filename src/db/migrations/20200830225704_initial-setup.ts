import * as Knex from 'knex'

export function up (knex: Knex): Knex.SchemaBuilder {
  return knex.schema
    .createTable('tenant', table => {
      table.uuid('id').primary().notNullable()
      table.timestamps()
      table.string('name').unique().notNullable()
    })
    .createTable('api', table => {
      table.uuid('id').primary().notNullable()
      table.timestamps()
      table.string('name').unique().notNullable()
    })
    .createTable('client', table => {
      table.uuid('id').primary().notNullable()
      table.timestamps()
      table.string('name', 255).notNullable()
      table.uuid('tenant_id').references('tenant.id').notNullable()
    })
    .createTable('api_client', table => {
      table.increments('id').primary().notNullable()
      table.timestamps()
      table.uuid('api_id').references('api.id').notNullable()
      table.uuid('client_id').references('client.id').notNullable()
    })
    .createTable('user', table => {
      table.uuid('id').primary().notNullable()
      table.timestamps()
      table.uuid('tenant_id').references('tenant.id').notNullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
    })
    .createTable('role', table => {
      table.uuid('id').primary().notNullable()
      table.timestamps()
      table.string('name').unique().notNullable()
    })
    .createTable('user_role', table => {
      table.increments('id').primary().notNullable()
      table.timestamps()
      table.uuid('user_id').references('user.id').notNullable()
      table.uuid('role_id').references('role.id').notNullable()
    })
    .createTable('permission', table => {
      table.uuid('id').primary().notNullable()
      table.timestamps()
      table.string('name').unique().notNullable()
    })
    .createTable('role_permission', table => {
      table.increments('id').primary().notNullable()
      table.timestamps()
      table.uuid('role_id').references('role.id').notNullable()
      table.uuid('permission_id').references('permission.id').notNullable()
    })
}

export function down (knex: Knex): Knex.SchemaBuilder {
  return knex.schema
    .dropTable('role_permission')
    .dropTable('permission')
    .dropTable('user_role')
    .dropTable('role')
    .dropTable('user')
    .dropTable('api_client')
    .dropTable('client')
    .dropTable('api')
    .dropTable('tenant')
}
