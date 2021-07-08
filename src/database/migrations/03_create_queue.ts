import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('operation_queue', (table) => {
    table.increments('id').primary()
    table.string('path').notNullable()
    table.string('method').notNullable()
    table.string('payload').notNullable()
    table
      .string('instance_id')
      .notNullable()
      .references('id')
      .inTable('instances')
    table.timestamps()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('operation_queue')
}
