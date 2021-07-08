import knex from '../../database/connection'
import { Request, Response } from 'express'
import InstanceService from '../../Services/Instance'
import * as types from './types'

const myRegion = 'europe' //here I'm assuming that I have an env file that can
//provide my region so I can search the closest Instance from the region.

class ResourceController {
  /**
   * Here I search if the resource is cached in the CDN
   * @param request {path}
   * @param response {data}
   *
   */
  async index(request: Request, response: Response) {
    try {
      const { path, latitude, longitude } = request.body
      const resource = await knex<types.IResource>('resource')
        .where('path', path)
        .andWhere('expiration_date', '<=', new Date())
        .first()
      // don't get any expired data

      if (!resource) {
        const instanceService = new InstanceService();
        let regionInstances = await instanceService.getInstanceByRegion(myRegion);
        const closestInstance = await instanceService.getClosestInstances({ latitude, longitude }, regionInstances)

        if (!closestInstance) return response.json("Resource unavailable").status(400)
        const freshResource = instanceService.getDataFromInstance(closestInstance, path)

        let today = new Date();
        today.setHours(today.getHours() + 3);

        await knex('resources').insert({ path: path, data: freshResource.data, expiratio_date: today });
      }

      return response.json({ resource })
    } catch (e) {
      console.log('e', e)
    }
  }

  async create(request: Request, response: Response) {

    return response.json("")
  }
}

export default ResourceController
