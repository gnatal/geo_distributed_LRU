import knex from '../database/connection'
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
  async getInstanceByRegion(request: Request, response: Response) {
    const { region } = request.params
    let instances = await knex('instances')
      .where('region', region)
      .where('active', true)
    if (!instances) instances = await knex('instances').where('active', true)
    return response.json({ instances })
  }

  getClosestInstances(instances: IInstance[], userPoint: IUserPoint) {
    const distances = instances.map((instance) => {
      const a = instance.latitude - userPoint.latitude
      const b = instance.longitude - userPoint.longitude
      return Math.sqrt(a * a + b * b)
    })
    return instances[distances.indexOf(Math.min(...distances))]
  }
}

export default InstanceController
