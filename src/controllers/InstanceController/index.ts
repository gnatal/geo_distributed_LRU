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

async function getInstanceByRegion(region: string) {
  try {
    let instances = await knex<IInstance>('instances')
      .where('region', region)
      .where('active', true)
    if (!instances)
      instances = await knex<IInstance>('instances').where('active', true)
    return instances
  } catch (e) {
    console.log('e', e)
  }
}

async function getClosestInstances(
  instances: IInstance[],
  userPoint: IUserPoint,
) {
  const distances = instances.map((instance) => {
    const a = instance.latitude - userPoint.latitude
    const b = instance.longitude - userPoint.longitude
    console.log('a and b', { a, b })
    return Math.sqrt(a * a + b * b)
  })
  return instances[distances.indexOf(Math.min(...distances))]
}

class InstanceController {
  async index(request: Request, response: Response) {
    try {
      const { userPoint } = request.body
      const instances = await knex<IInstance>('instances').where('active', true)

      //   const instances = await getInstanceByRegion(request.params.region)
      const closestInstance = await getClosestInstances(instances, userPoint)
      return response.json({ closestInstance })
    } catch (e) {
      console.log('e', e)
    }
  }
  async create(request: Request, response: Response) {
    const instance = {}
    const transaction = await knex.transaction()
    const inserted_ids = await transaction('instance').insert(instance)
  }
}

export default InstanceController
