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

    }

    async update(request: Request, response: Response) {
        try {

            const { path, instance_id, payload } = request.body

            await knex('instance_mock').update({ data: payload }).where("path", path);
            return response.status(201)
        } catch (e) {
            console.log("error updating")
        }
    }

    async delete(request: Request, response: Response) {
        try {

            const { path } = request.body
            await knex('instance_mock').where("path", path).del()
            return response.status(201)
        } catch (e) {
            console.log("error deleting")
        }
    }
}

export default InstanceMockController
