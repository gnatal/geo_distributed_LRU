import knex from '../database/connection'
import axios from 'axios';

interface IQueueOperation {
    id?: string;
    path: string
    method: string
    payload: string
    instance_id?: string
}

interface IInstance {
    id: string
    region: string
    latitude: number
    longitude: number
    active: boolean
}


class QueueService {

    async LoadQueue({ path, method, payload }: IQueueOperation) {
        const instances = await knex<IInstance>('instances');
        const queue: IQueueOperation[] = [];
        instances.forEach(instance => {
            queue.push({ path, method, payload, instance_id: instance.id })
        })

        await knex('operation_queue').insert(queue)
    }

    async UnloadQueue() {
        const queue = await knex<IQueueOperation>('operation_queue');
        queue.forEach(async queue => {
            try {
                await axios({
                    method: queue.method,
                    url: queue.path,
                    data: queue.payload
                });

                await knex('operation_queue').where('id', queue.id).del()
            } catch (e) {
                console.log(e) //here I would use a sentry Io or something to log the error 
            }
        })
    }



    // async index(request: Request, response: Response) {
    //     try {
    //         const { userPoint } = request.body
    //         const instances = await knex<IInstance>('instances').where('active', true)

    //         //   const instances = await getInstanceByRegion(request.params.region)
    //         const closestInstance = await getClosestInstances(instances, userPoint)
    //         return response.json({ closestInstance })
    //     } catch (e) {
    //         console.log('e', e)
    //     }
    // }
    // async create(request: Request, response: Response) {
    //     const instance = {}
    //     const transaction = await knex.transaction()
    //     const inserted_ids = await transaction('instance').insert(instance)
    // }
}

export default QueueService
