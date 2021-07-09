import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('resources').insert([
        {
            data: 'first cached item',
            path: 'cached_source',
            expiration_date: Date.now(),
        },
    ])
}
