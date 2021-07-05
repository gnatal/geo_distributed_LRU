import Knex, { CreateTableBuilder } from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('resources', (table) => {
    table.increments('id').primary()
    table.string('path').notNullable()
    table.string('data').notNullable()
    table.date('expiration_date').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('resources')
}
