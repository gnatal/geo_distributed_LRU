import Knex, { CreateTableBuilder } from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('packages', (table) => {
    table.increments('id').primary()
    table.string('package').notNullable()
    table.boolean('active').notNullable()
    table.date('last_time_used').notNullable()
    table.timestamps()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('instances')
}
