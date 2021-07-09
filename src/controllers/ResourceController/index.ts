import knex from '../../database/connection'
import { Request, Response } from 'express'
import InstanceService from '../../Services/Instance'
import Queue from '../../Services/Queue'
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
      const resource = await knex<types.IResource>('resources')
        .where('path', path)
        .andWhere('expiration_date', '<=', new Date())
        .first()

      // don't get any expired data

      if (!resource) {
        const instanceService = new InstanceService();
        let regionInstances = await instanceService.getInstanceByRegion(myRegion);
        const closestInstance = await instanceService.getClosestInstances({ latitude, longitude }, regionInstances)

        if (!closestInstance) return response.json("Resource unavailable").status(400)

        let freshResource = (await instanceService.getDataFromInstance(closestInstance, path) || { data: "" })
        let today = Date.now();
        today += 3 * 3600; //adding 3 hours to the time stamp
        await knex('resources').insert({ path: path, data: freshResource.data, expiration_date: today });
        return response.json({ freshResource, wasCached: false })
      } else {
        return response.json({ resource, wasCached: true })
      }

    } catch (e) {
      console.log('error at resource controlelr')
      return response.json("not found").status(401)
    }
  }

  /**
   * Here a create a new resource
   */
  async create(request: Request, response: Response) {
    try {

      const { path, data } = request.body;
      const queueService = new Queue();
      const queue = await queueService.LoadQueue({ path, method: "post", payload: data });
      await queueService.UnloadQueue();
      return response.status(201).json({ queue })
    } catch (e) {
      return response.json("error").status(400)
    }
  }

  async update(request: Request, response: Response) {
    try {

      const { path, data } = request.body;
      const queueService = new Queue();
      const queue = await queueService.LoadQueue({ path, method: "put", payload: data });
      await queueService.UnloadQueue();
      return response.json({ queue }).status(200)
    } catch (e) {
      return response.json("error").status(400)
    }
  }

  async delete(request: Request, response: Response) {
    try {

      const { path } = request.body;
      const queueService = new Queue();
      const queue = queueService.LoadQueue({ path, method: "delete", payload: "" });
      await queueService.UnloadQueue();
      return response.json({ queue }).status(200)
    } catch (e) {

      return response.json("error").status(400)
    }
  }


}

export default ResourceController
