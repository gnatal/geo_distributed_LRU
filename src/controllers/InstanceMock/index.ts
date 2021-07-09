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
        try {
            const { path, instance_id, payload } = request.body
            const newInstance: IInstanceMock = {
                path,
                data: payload,
                instance_id,
            }
            await knex('instance_mock').insert(newInstance)
            return response.status(201)

        } catch (e) {
            console.log("error writing mock")
        }

        // const inserted_ids = await transaction('instance').insert(instance)
    }

    async update(request: Request, response: Response) {
        const { path, instance_id, payload } = request.body
        const newInstance: IInstanceMock = {
            path,
            data: payload,
            instance_id,
        }

        await knex('instance_mock').insert(newInstance)
        return response.status(201)
    }

    async delte(request: Request, response: Response) {
        const { path, instance_id, payload } = request.body

        await knex('instance_mock').del().where("path", path).andWhere("payload", payload).andWhere("instance_id", instance_id)
        // const inserted_ids = await transaction('instance').insert(instance)
        return response.status(201)
    }
}

export default InstanceMockController
