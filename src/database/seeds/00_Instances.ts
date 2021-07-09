import Knex from 'knex'

export async function seed(knex: Knex) {
  await knex('instances').insert([
    {
      region: 'south-america',
      latitude: '1',
      longitude: '2',
      active: true,
    },
    {
      region: 'north-america',
      latitude: '3',
      longitude: '2',
      active: true,
    },
    {
      region: 'asia',
      latitude: '1',
      longitude: '8',
      active: true,
    },
    {
      region: 'europe',
      latitude: '4',
      longitude: '5',
      active: true,
    },
    {
      region: 'south-asia',
      latitude: '-1',
      longitude: '0',
      active: true,
    },
  ])
}
