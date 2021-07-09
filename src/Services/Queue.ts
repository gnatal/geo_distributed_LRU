import knex from '../database/connection'
import axios, { AxiosRequestConfig, Method } from 'axios';

interface IQueueOperation {
    id?: string
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

const basePath = "http://localhost:3000/instance_mock"

interface IAxios {
    get: string
    post: string
    put: string
    delete: string
}



class QueueService {

    async LoadQueue({ path, method, payload }: IQueueOperation) {
        try {

            const instances = await knex<IInstance>('instances');
            const queue: IQueueOperation[] = [];
            instances.forEach(instance => {
                queue.push({ path, method, payload, instance_id: instance.id })
            })
            await knex('operation_queue').insert(queue)
            return await knex<IQueueOperation>('operation_queue')

        } catch (e) {
            console.log("error at loading queue", e)
        }
    }

    async UnloadQueue() {
        const queue = await knex<IQueueOperation>('operation_queue');
        for (let index = 0; index < queue.length; index++)
            try {
                let config;
                switch (queue[index].method) {
                    case 'get':
                        config = { method: "GET" as Method, url: basePath, data: { ...queue[index] } }
                        break;
                    case 'post':
                        config = { method: "POST" as Method, url: basePath, data: { ...queue[index] } }
                        break;
                    case 'put':
                        config = { method: "PUT" as Method, url: basePath, data: { ...queue[index] } }
                        break;
                    case 'delete':
                        config = { method: "DELETE" as Method, url: basePath, data: { ...queue[index] } }
                        break;
                    default:
                        config = { method: "GET" as Method, url: basePath, data: { ...queue[index] } }
                }
                axios(config).then(() => {
                    console.log("queue id", queue[index].id)
                }).catch(e => console.log("error unloading queue", e));
                await knex('operation_queue').where('id', queue[index].id).del()
            } catch (e) {
                console.log("error unloading", e) //here I would use a sentry Io or something to log the error 
            }
    }



}

export default QueueService
