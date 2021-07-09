import knex from '../../database/connection'
import { Request, Response } from 'express'

interface IInstanceMock {
    id?: string
    path: string
    data: string
    instance_id: string
}


class InstanceMockController {


    // here I create a new instance to work on the system
    async create(request: Request, response: Response) {
        const { path, instance_id, payload } = request.body
        const newInstance: IInstanceMock = {
            path,
            data: payload,
            instance_id,
        }

        await knex('instance_mock').insert(newInstance)
        // const inserted_ids = await transaction('instance').insert(instance)
    }
}

export default InstanceMockController
