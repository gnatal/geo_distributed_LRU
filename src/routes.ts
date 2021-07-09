import express from 'express'
import InstanceController from './controllers/InstanceController'
import ResourceController from './controllers/ResourceController'
import InstanceMock from './controllers/InstanceMock'

const instanceController = new InstanceController()
const resourceController = new ResourceController()
const instanceMock = new InstanceMock()

const routes = express.Router()
routes.use(express.json())

routes.get('/', (request, response) => {
  return response.json({ message: 'hello word' })
})

routes.get('/getResource', resourceController.index)
routes.post('/resource', resourceController.create)
routes.put('/resource', resourceController.update)
routes.delete('/resource', resourceController.delete)

routes.post('/instance_mock', instanceMock.create)

export default routes
