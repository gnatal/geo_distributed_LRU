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
      return response.json('')
    } catch (e) {
      console.log('eerror getting isntance')
    }
  }

  // here I create a new instance to work on the system
  async create(request: Request, response: Response) {
    try {
      const { latitude, longitude, region } = request.body
      const newInstance: IInstance = {
        region,
        latitude,
        longitude,
        active: true,
      }

      await knex('instances').insert(newInstance)
      return response.status(201).json({ newInstance })
    } catch (e) {
      console.log('error', e)
      return response.status(401).json({ error: e })
    }
    // const inserted_ids = await transaction('instance').insert(instance)
  }
}

export default InstanceController
