import knex from '../../database/connection'
import { Request, Response } from 'express'
import * as types from './types'

class ResourceController {
  /**
   *
   * @param request {path}
   * @param response {data}
   *
   */
  async index(request: Request, response: Response) {
    try {
      const { path } = request.body
      const resource = await knex<types.IResource>('resource')
        .where('path', path)
        .first()
      return response.json({ resource })
    } catch (e) {
      console.log('e', e)
    }
  }
}

export default ResourceController
