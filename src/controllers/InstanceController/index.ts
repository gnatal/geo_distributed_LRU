import knex from '../../database/connection'
import { Request, Response } from 'express'

interface IInstance {
  id: string
  region: string
  latitude: number
  longitude: number
  active: boolean
}

interface IUserPoint {
  latitude: number
  longitude: number
}


class InstanceController {
  async index(request: Request, response: Response) {
    try {
      const { userPoint } = request.body
      const instances = await knex<IInstance>('instances').where('active', true)

      //   const instances = await getInstanceByRegion(request.params.region)
      // const closestInstance = await getClosestInstances(instances, userPoint)
      return response.json("")
    } catch (e) {
      console.log('e', e)
    }
  }

  async create(request: Request, response: Response) {
    const instance = {}
    // const inserted_ids = await transaction('instance').insert(instance)
  }
}

export default InstanceController
