import Knex from 'knex'

export async function seed(knex: Knex) {
  await knex('instances').insert([
    {
      region: 'south-america',
      latitude: '1',
      longitude: '2',
      active: true,
      last_time_used: new Date(),
    },
    {
      region: 'north-america',
      latitude: '1',
      longitude: '2',
      active: true,
      last_time_used: new Date(),
    },
    {
      region: 'asia',
      latitude: '1',
      longitude: '2',
      active: true,
      last_time_used: new Date(),
    },
    {
      region: 'europe',
      latitude: '1',
      longitude: '2',
      active: true,
      last_time_used: new Date(),
    },
    {
      region: 'south-asia',
      latitude: '1',
      longitude: '2',
      active: true,
      last_time_used: new Date(),
    },
  ])
}

// table.increments('id').primary()
// table.string('region').notNullable()
// table.decimal('longitude').notNullable()
// table.decimal('latitude').notNullable()
// table.boolean('active').notNullable()
// table.date('last_time_used').notNullable()
