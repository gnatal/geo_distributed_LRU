import Knex, { CreateTableBuilder } from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('instances', (table) => {
    table.increments('id').primary()
    table.string('region').notNullable()
    table.decimal('longitude').notNullable()
    table.decimal('latitude').notNullable()
    table.boolean('active').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('instances')
}
