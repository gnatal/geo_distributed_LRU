import knex from '../../database/connection'
import { Request, Response } from 'express'

interface IInstance {
  id?: string
  region: string
  latitude: number
  longitude: number
  active: boolean
}

interface IUserPoint {
  latitude: number
  longitude: number
}

const myRegion = 'europe'

class InstanceController {
  async index(request: Request, response: Response) {
    try {
      const { userPoint } = request.body
      const instances = await knex<IInstance>('instances').where('active', true)

      return response.json('')
    } catch (e) {
      console.log('e', e)
    }
  }

  // here I create a new instance to work on the system
  async create(request: Request, response: Response) {
    const { latitude, longitude } = request.body
    const newInstance: IInstance = {
      region: myRegion,
      latitude,
      longitude,
      active: true,
    }

    await knex('instance').insert(newInstance)
    // const inserted_ids = await transaction('instance').insert(instance)
  }
}

export default InstanceController
