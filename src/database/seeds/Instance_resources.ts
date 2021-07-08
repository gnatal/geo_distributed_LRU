import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('instances').insert([
        {
            path: 'user',
            data: 'jorges',
            instance_id: '1',
        },
        {
            path: 'user',
            data: 'jorges',
            instance_id: '2',
        },
        {
            path: 'user',
            data: 'jorges',
            instance_id: '3',
        },
        {
            path: 'user',
            data: 'jorges',
            instance_id: '4',
        },
        {
            path: 'user',
            data: 'jorges',
            instance_id: '5',
        },
        {
            path: 'admins',
            data: 'jules',
            instance_id: '1',
        },
        {
            path: 'admins',
            data: 'jules',
            instance_id: '2',
        },
        {
            path: 'admins',
            data: 'jules',
            instance_id: '3',
        },
        {
            path: 'admins',
            data: 'jules',
            instance_id: '4',
        },
        {
            path: 'admins',
            data: 'jules',
            instance_id: '5',
        },
    ])
}

