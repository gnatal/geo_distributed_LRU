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

interface IInstanceResouce {
    id?: string;
    path: string;
    data: string;
    instance_id: string;
}

class InstanceService {
    async getInstanceByRegion(region: string) {
        try {
            let instances = await knex<IInstance>('instances')
                .where('region', region)
                .where('active', true)
            if (!instances)
                instances = await knex<IInstance>('instances').where('active', true)
            return instances
        } catch (e) {
            console.log('e', e) //another log file that I would make
        }
    }

    async getClosestInstances(
        userPoint: IUserPoint,
        instances?: IInstance[]
    ) {
        if (!instances) return null;

        const distances = instances.map((instance) => {
            const a = instance.latitude - userPoint.latitude
            const b = instance.longitude - userPoint.longitude
            console.log('a and b', { a, b })
            return Math.sqrt(a * a + b * b)
        })
        return instances[distances.indexOf(Math.min(...distances))]
    }

    async getDataFromInstance(instance: IInstance, path: string): IInstanceResouce {
        const resource = await knex<IInstanceResouce>('instance_mock').where("instance_id", instance.id).andWhere('path', path)
        return resource;
    }

}

export default InstanceService;