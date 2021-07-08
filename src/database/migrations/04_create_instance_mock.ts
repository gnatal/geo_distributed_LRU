import Knex, { CreateTableBuilder } from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('instance_mock', (table) => {
        table.increments('id').primary()
        table.string('path').notNullable()
        table.string('data').notNullable()
        table
            .string('instance_id')
            .notNullable()
            .references('id')
            .inTable('instances')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('instance_mock')
}
